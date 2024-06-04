const express = require("express");
const path = require("path");
const app = express();

const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

const Filter = require("bad-words");
const { generateMessage, generateLocationMessage } = require("./src/utils");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./src/users");

io.on("connection", (socket) => {
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id)
    const filter = new Filter();

    let nm = filter.clean(message);
    io.to(user.room).emit("message", generateMessage(user.username,nm));
    callback("Delivered");
  });

  socket.on("location", (obj) => {
    const user = getUser(socket.id)
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(user.username,
        `https://google.com/maps?q=${obj.latitute},${obj.longitude}`
      )
    );
  });

  socket.on("join", ({ username, room }, callback) => {
    
    const { error, user } = addUser({ id: socket.id, username, room });

    if(error) return callback(error) 
    socket.join(user.room);
    socket.emit("message", generateMessage("Admin","Welcome"));

    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage(user.username,`${user.username} has joined!`));

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })
    callback()

  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id)
    if(user) io.to(user.room).emit("message", generateMessage(user.username,`${user.username} has left!`));
    io.to(user?.room).emit('roomData',{
      room: user?.room,
      users: getUsersInRoom(user?.room)
    })
  });
});

const publicDir = path.join(__dirname, "./public");

const PORT = process.env.PORT || 6008;

app.use(express.static(publicDir));

server.listen(PORT, () => {
  console.log("Server is listening on 6008!");
});
