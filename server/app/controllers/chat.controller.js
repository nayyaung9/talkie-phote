"use strict";

const Chat = require("../models/Chat");

exports.fetchAllMessages = async (req, res) => {
  await Chat.find()
    .populate("sender")
    .then((data) => {
      return res.status(200).json({ status: true, data });
    });
};
