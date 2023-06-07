const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { spawn } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const MAX_ROOM_CAPACITY = 3;
const rooms = new Map();
const users = new Map();

app.get("/rooms", (req, res) => {
  const roomList = Array.from(rooms.keys()).map((roomID) => {
    const room = rooms.get(roomID);
    return {
      roomID,
      password: room.password,
      clientCount: room.clients.length,
    };
  });
  res.json(roomList);
});

io.on("connection", (socket) => {
  console.log("A user connected");

  let roomID = null;
  let userID = null;
  const userRooms = new Map();

  socket.on("joinRoom", (data) => {
    const { roomID: requestedRoomID, password } = data;
    if (
      userRooms.has(socket.id) &&
      userRooms.get(socket.id).includes(requestedRoomID)
    ) {
      socket.emit("alreadyJoined");
      return;
    }

    if (rooms.has(requestedRoomID)) {
      const room = rooms.get(requestedRoomID);
      if (
        room.password === password &&
        room.clients.length < MAX_ROOM_CAPACITY
      ) {
        socket.join(requestedRoomID);
        room.clients.push(socket);
        roomID = requestedRoomID;
        userID = generateUserID();
        users.set(userID, socket);

        if (userRooms.has(socket.id)) {
          const joinedRooms = userRooms.get(socket.id);
          joinedRooms.push(requestedRoomID);
        } else {
          userRooms.set(socket.id, [requestedRoomID]);
        }

        console.log(`User ${userID} joined room: ${roomID}`);
        socket.emit("roomJoined", { roomID, userID });

        // Send current shared code to the user
        setTimeout(() => {
          socket.emit("updateCode", room.sharedCode);
          socket.emit("LanguageChanged", room.language);
        }, 5000);
      } else {
        socket.emit("invalidPassword");
      }
    } else {
      socket.emit("roomNotFound");
    }
  });

  socket.on("createRoom", (data) => {
    const { password } = data;

    if (userRooms.has(socket.id) && userRooms.get(socket.id).length > 0) {
      socket.emit("alreadyJoined");
      return;
    }

    if (!rooms.has(roomID)) {
      roomID = generateRoomID();
      socket.join(roomID);
      rooms.set(roomID, { clients: [socket], password });

      userID = generateUserID();
      users.set(userID, socket);

      if (userRooms.has(socket.id)) {
        const joinedRooms = userRooms.get(socket.id);
        joinedRooms.push(roomID);
      } else {
        userRooms.set(socket.id, [roomID]);
      }

      console.log(`User ${userID} created room: ${roomID}`);
      socket.emit("roomCreated", { roomID, userID });
    } else {
      socket.emit("roomExists");
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    if (userID) {
      users.delete(userID);
    }
    if (roomID) {
      if (rooms.has(roomID)) {
        const room = rooms.get(roomID);
        room.clients = room.clients.filter((client) => client !== socket);
        if (room.clients.length === 0) {
          rooms.delete(roomID);
          console.log(`Room ${roomID} deleted`);
        }
      }
      socket.leave(roomID);
    }

    if (userRooms.has(socket.id)) {
      const joinedRooms = userRooms.get(socket.id);
      const updatedJoinedRooms = joinedRooms.filter((room) => room !== roomID);
      if (updatedJoinedRooms.length === 0) {
        userRooms.delete(socket.id);
      } else {
        userRooms.set(socket.id, updatedJoinedRooms);
      }
    }
  });

  socket.on("codeUpdate", (updatedCode) => {
    if (roomID) {
      const room = rooms.get(roomID);
      room.sharedCode = updatedCode;
      socket.to(roomID).emit("updateCode", updatedCode);
    }
  });
  socket.on("changeLanguage", (language) => {
    if (roomID) {
      const room = rooms.get(roomID);
      room.language = language;
      socket.to(roomID).emit("LanguageChanged", language);
    }
  });

  socket.on("runCode", (data) => {
    if (roomID) {
      const { code, language } = data;
      let runner;

      // Code execution logic
      switch (language) {
        case "javascript":
          runner = spawn("node", ["-e", code]);
          break;
        case "python":
          runner = spawn("python", ["-c", code]);
          break;
        case "ruby":
          runner = spawn("ruby", ["-e", code]);
          break;
        case "java":
          runner = spawn("java", ["-cp", ".", "Main"]);
          break;
        case "c":
          runner = spawn("gcc", ["-o", "program", "-xc", "-"]);
          runner.stdin.write(code);
          runner.stdin.end();
          break;
        case "cpp":
          runner = spawn("g++", ["-o", "program", "-xc++", "-"]);
          runner.stdin.write(code);
          runner.stdin.end();
          break;
        case "csharp":
          runner = spawn("dotnet", ["run", "--project", "Program.csproj"], {
            cwd: "csharp",
          });
          runner.stdin.write(code);
          runner.stdin.end();
          break;
        case "go":
          runner = spawn("go", ["run", "main.go"], { cwd: "go" });
          runner.stdin.write(code);
          runner.stdin.end();
          break;
        case "rust":
          runner = spawn("rustc", ["-o", "program", "-"], { cwd: "rust" });
          runner.stdin.write(code);
          runner.stdin.end();
          break;
        case "swift":
          runner = spawn("swift", ["-"], { cwd: "swift" });
          runner.stdin.write(code);
          runner.stdin.end();
          break;
        case "php":
          runner = spawn("php", ["-r", code]);
          break;
        case "perl":
          runner = spawn("perl", ["-e", code]);
          break;
        case "lua":
          runner = spawn("lua", ["-e", code]);
          break;
        case "typescript":
          runner = spawn("ts-node", ["-e", code]);
          break;
        case "bash":
          runner = spawn("bash", ["-c", code]);
          break;
        default:
          socket.emit("output", "Invalid language");
          return;
      }

      if (runner) {
        runner.stdout.on("data", (data) => {
          socket.emit("output", data.toString());
          socket.to(roomID).emit("output", data.toString());
        });

        runner.stderr.on("data", (data) => {
          socket.emit("output", data.toString());
          socket.to(roomID).emit("output", data.toString());
        });
      }
    }
  });
});

function generateRoomID() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let roomID = "";
  for (let i = 0; i < 6; i++) {
    roomID += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return roomID;
}

function generateUserID() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let userID = "";
  for (let i = 0; i < 10; i++) {
    userID += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return userID;
}

const APP_PORT = 3090;
server.listen(APP_PORT, () => {
  console.log("Server is running on port 3090");
});
