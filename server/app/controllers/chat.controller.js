"use strict";

const { Chat, EventType } = require("../models/Chat");

exports.fetchAllMessages = async (req, res) => {
  await Chat.find()
    .populate("sender")
    .then((data) => {
      return res.status(200).json({ status: true, data });
    });
};

exports.sendMessage = async (data, io) => {
  const { message, roomId, sender } = data;
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
        .then((data) => {
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
