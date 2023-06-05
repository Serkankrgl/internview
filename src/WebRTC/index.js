const express = require("express");
const http = require("http");
const cors = require("cors");
const axios = require("axios");
const twilio = require("twilio");
const {
  createNewRoomHandler,
  joinRoomHandler,
  disconnectHandler,
  signalingHandler,
  initializeConnectionHandler,
  directMessageHandler,
  checkRoomExists,
  getTurnCredentials,
} = require("./sockets/handlers");
const PORT = process.env.PORT || 5008;
const app = express();
const server = http.createServer(app);

app.use(cors());

// create route to check if room exists
app.get("/api/room-exists/:roomId", checkRoomExists);

// create route to get TURN server credentials
app.get("/api/get-turn-credentials", getTurnCredentials);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("create-new-room", (data) => {
    createNewRoomHandler(data, socket);
  });

  socket.on("join-room", (data) => {
    joinRoomHandler(data, socket, io);
  });

  socket.on("disconnect", () => {
    disconnectHandler(socket, io);
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
