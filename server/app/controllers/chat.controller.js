"use strict";

const { Chat, EventType } = require("../models/Chat");
var FCM = require("fcm-node");

exports.fetchAllMessages = async (req, res) => {
  await Chat.find()
    .populate("sender")
    .then((data) => {
      return res.status(200).json({ status: true, data });
    });
};

exports.sendMessage = async (data, io) => {
  const { message, roomId, sender } = data;

  var serverKey =
    "AAAAnkUgEbM:APA91bGgOiGaDcLFmsURPYh7OyjV1bCkE_YOXoORbJYebqK3Z8hSDsB1hy99aDqSuFkTA46-tDczI3Je02RZOrSN98L9ohm7FUzKZyCZDS8l6MTrD0LMAOr1GubKnaW9EXUY65bxY7Cm"; // put your server key here
  var fcm = new FCM(serverKey);

  var fcmMessage = {
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: data.token,

    notification: {
      title: "You have received a new message",
      body: message,
    },
  };

  try {
    let chat = new Chat({
      message,
      sender: sender._id,
      roomId,
      event_type: EventType.MESSAGE,
    });

    await chat.save().then(async (result) => {
      await Chat.find({ roomId, _id: result._id })
        .populate("sender")
        .then(async (data) => {
          fcm.send(fcmMessage, function (err, response) {
            if (err) {
              console.log("Something has gone wrong!");
            } else {
              console.log("Successfully sent with response: ", response);
            }
          });
          io.in(roomId).emit("event://push-message", data);
        });
    });
  } catch (err) {
    console.log("Send message error", err);
  }
};

exports.fetchInitialMessageByRoomId = async (roomId, io) => {
  try {
    await Chat.find({ roomId })
      .populate("sender")
      .limit(100)
      .then((res) => {
        io.in(roomId).emit("event://init-message", res);
      });
  } catch (err) {
    console.log("fetchMessageByRoomId error", err);
  }
};
