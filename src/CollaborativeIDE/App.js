const express = require("express");
const http = require("http");
// const socketIO = require("socket.io");
const axios = require("axios");
const { spawn } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const APP_PORT = 3090;
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("codeUpdate", (updatedCode) => {
    socket.broadcast.emit("updateCode", updatedCode);
  });

  socket.on("runCode", (data) => {
    const { code, language } = data;
    let runner;

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
      });

      runner.stderr.on("data", (data) => {
        socket.emit("output", data.toString());
      });
    }
  });
});

server.listen(APP_PORT, () => {
  //   axios({
  //     method: "POST",
  //     url: "http://localhost:3001/apiRegister",
  //     headers: { "Content-Type": "application/json" },
  //     data: {
  //       apiName: "IDEService",
  //       protocol: "http",
  //       host: "localhost",
  //       port: APP_PORT,
  //     },
  //   }).then((result) => {
  //     console.log(result.data);
  //   });
  console.log("Server is running on port 3090");
});
