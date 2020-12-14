var express = require("express"),
  mongoose = require("mongoose"),
  config = require("./config/db"),
  app = express(),
  server = require("http").Server(app),
  Chat = require("./app/models/Chat"),
  chatController = require("./app/controllers/chat.controller"),
  io = require("socket.io")(server, {
    cors: {
      origin: ["https://talkie-phote.netlify.app", "http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  }),
  PORT = process.env.PORT || 8000;

var options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db;
// mongoose instance connection url connection
if (mongoose.connection.readyState != 1) {
  mongoose.Promise = global.Promise;
  console.log("DB URL ", config.db);
  mongoose.connect(config.db, options);
  db = mongoose.connection;
  db.on("error", (err) => {
    throw new Error(
      `Unable to connect to database at ${config.db} err, ${err}`
    );
  });

  db.once("open", function () {
    console.log("Database is connected");
  });
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Origin",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  req.io = io;
  next();
});

// Bring in our dependencies
require("./config/express")(app, config);

server.listen(PORT, () => {
  console.log("We are live on port: ", PORT);
});

io.on("connection", async (socket) => {
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  socket.on("room", async function (roomId) {
    socket.join(roomId);
  });

  socket.on("event://send-message", async function (message) {
    const data = JSON.parse(message);

    await chatController.sendMessage(data, io);
  });

  await chatController.fetchInitialMessageByRoomId(roomId, io);

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});
