const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app); //creating a http server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//once a person is connected
io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  //listen to the event called send_message
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    // socket.broadcast.emit("receive_message", data); //broadcasts the message to event receive_message to everyone except user
  });
});
server.listen(3001, () => {
  console.log("Server is runnning");
});
