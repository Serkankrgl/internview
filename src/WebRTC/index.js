const express = require("express");
const http = require("http");
const cors = require("cors");
const axios = require("axios");
const {
  createNewRoomHandler,
  joinRoomHandler,
  disconnectHandler,
  signalingHandler,
  initializeConnectionHandler,
  directMessageHandler,
} = require("./sockets/handlers");
const PORT = process.env.PORT || 5008;
const app = express();
const server = http.createServer(app);

app.use(cors());

let connectedUsers = [];
let rooms = [];

// create route to check if room exists
app.get("/api/room-exists/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms.find((room) => room.id === roomId);

  if (room) {
    // send response that room exists
    if (room.connectedUsers.length > 3) {
      return res.send({ roomExists: true, full: true });
    } else {
      return res.send({ roomExists: true, full: false });
    }
  } else {
    // send response that room does not exist
    return res.send({ roomExists: false });
  }
});

// create route to get TURN server credentials
app.get("/api/get-turn-credentials", (req, res) => {
  const accountSid = "AC7cff1792ce0f8d410f4790a5048eeeb7";
  const authToken = "c9f5e65fe22c2e6764d5ca5530d4970c";
  const client = twilio(accountSid, authToken);

  try {
    client.tokens.create().then((token) => {
      res.send({ token });
    });
  } catch (err) {
    console.log("error occurred when fetching turn server credentials");
    console.log(err);
    res.send({ token: null });
  }
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("create-new-room", (data) => {
    createNewRoomHandler(data, socket, connectedUsers, rooms);
  });

  socket.on("join-room", (data) => {
    joinRoomHandler(data, socket, connectedUsers, rooms, io);
  });

  socket.on("disconnect", () => {
    disconnectHandler(socket, connectedUsers, rooms, io);
  });

  socket.on("conn-signal", (data) => {
    signalingHandler(data, socket, io);
  });

  socket.on("conn-init", (data) => {
    initializeConnectionHandler(data, socket, io);
  });

  socket.on("direct-message", (data) => {
    directMessageHandler(data, socket, io);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
  axios({
    method: "POST",
    url: "http://localhost:3001/apiRegister",
    headers: { "Content-Type": "application/json" },
    data: {
      apiName: "WebRTCServices",
      protocol: "http",
      host: "localhost",
      port: PORT,
    },
  }).then((result) => {
    console.log(result.data);
  });
});
