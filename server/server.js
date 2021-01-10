var express = require("express"),
  mongoose = require("mongoose"),
  config = require("./config/db"),
  app = express(),
  server = require("http").Server(app),
  chatController = require("./app/controllers/chat.controller"),
  gcm = require("node-gcm"),
  FCM = require("fcm-push"),
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

// const sender = new gcm.Sender("AIzaSyCJwQ1zmKmOsSscLdQE3ONj0bcehlxJr0A");
// const regTokens = [];

let db;
// mongoose instance connection url connection
if (mongoose.connection.readyState != 1) {
  mongoose.Promise = global.Promise;
  console.log("DB URL ", config.db);
  mongoose.connect(config.db, options);
  db = mongoose.connection;
  db.on("error", (err) => {
    throw new Error(`Unable to connect to database at ${config.db} err, ${err}`);
  });

  db.once("open", function () {
    console.log("Database is connected");
  });
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept");
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
    console.log(data);

    var serverKey = "AIzaSyCJwQ1zmKmOsSscLdQE3ONj0bcehlxJr0A"; //put server key here
    var fcm = new FCM(serverKey);

    var token = ""; // put token here which user you have to send push notification
    var messageLet = {
      to: token,
      notification: { title: "hello", body: "test" },
      data: { my_key: "my value", contents: "abcv/" },
    };
    fcm.send(messageLet, function (err, res) {
      if (err) {
        res.json({ status: 0, message: err });
      } else {
        res.json({ status: 1, message: res });
      }
    });

    // if (regTokens.indexOf(data.sender._id) === -1) {
    //   regTokens.push(data.sender._id);

    //   console.log("regTokens", regTokens);
    //   let messageLet = new gcm.Message({
    //     data: {
    //       key1: "msg1",
    //     },
    //     notification: {
    //       title: "Hello, World",
    //       icon: "ic_launcher",
    //       body: "This is a notification that will be displayed if your app is in the background.",
    //     },
    //   });

    //   messageLet.addNotification({
    //     title: "Alert!!!",
    //     body: "Abnormal data access",
    //     icon: "drawable-hdpi-icon",
    //     image: "drawable-hdpi-icon",
    //     alert: "true",
    //     sound: "true",
    //   });

    //   // [*] Sending our push datas
    //   sender.send(
    //     messageLet,
    //     {
    //       registrationTokens: "92732c3e004ca64e0d280d8d89e35f39",
    //     },
    //     (err, response) => {
    //       if (err) console.error("err", err);
    //       else console.log(response);
    //     },
    //   );
    // }
    await chatController.sendMessage(data, io);
  });

  await chatController.fetchInitialMessageByRoomId(roomId, io);

  socket.on("typing", (data) => {
    const payload = JSON.parse(data);
    io.in(roomId).emit("notifyTyping", {
      username: payload.fullname,
      message: "is typing...",
    });
  });

  socket.on("stopTyping", () => {
    io.in(roomId).emit("notifyStopTyping", { status: false });
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});
