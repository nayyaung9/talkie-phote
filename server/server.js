var express = require("express"),
  mongoose = require("mongoose"),
  config = require("./config/db"),
  app = express(),
  server = require("http").Server(app),
  io = require("socket.io")(server),
  Chat = require("./app/models/Chat"),
  PORT = process.env.PORT || 8000;

var options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// mongoose instance connection url connection
if (mongoose.connection.readyState != 1) {
  mongoose.Promise = global.Promise;
  console.log("DB URL ", config.db);
  mongoose.connect(config.db, options);
  const db = mongoose.connection;
  db.on("error", (err) => {
    throw new Error(`Unable to connect to database at ${config.db} err`);
  });

  db.once("open", function () {
    console.log("Database is connected");
  });
}

app.use(function (req, res, next) {
  req.io = io;
  next();
});

// Bring in our dependencies
require("./config/express")(app, config);

server.listen(PORT, () => {
  console.log("We are live on port: ", PORT);
});

// io.on("connection", function (socket) {
//   socket.on("event://send-message", function (message) {
//     console.log("Message from client : " + message);

//     const data = JSON.parse(message);
//     socket.broadcast.emit("received", { message: data });

    
//     // let chatMessage = new Chat({ message: data.message, sender: data.user._id });
//     // chatMessage.save();
//   });

//   socket.on("room", function (room) {
//     console.log('room', room);
//     socket.join(room);
//   });
// });


io.on("connection", socket => {
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  console.log(roomId);

  socket.on("event://send-message", function (message) {

    const data = JSON.parse(message);
    // socket.broadcast.emit("received", { message: data });
    io.in(roomId).emit("received", { data });

  });

})