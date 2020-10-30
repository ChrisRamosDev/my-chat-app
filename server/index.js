const express = require("express");
const http = require("http");
const cors = require("cors");

const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 5000 || process.env.PORT;
const router = require("./router");

app.use(router);
app.use(cors);

const { addUser } = require("./users.js");

// triggers on connection
io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "Admin",
      text: `${user.name}, welcome to the room!`,
    });
  });

  socket.on("disconnect", () => {
    io.emit("message", "user left Chatt");
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
