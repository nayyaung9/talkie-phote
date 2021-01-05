"use strict";

const User = require("../models/User");

exports.fetchAllUsers = async (req, res) => {
  await User.find()
    .then((data) => {
      return res.status(200).json({ status: true, data });
    })
    .catch((err) => {
      return res.status(500).json({ status: true, data: err });
    });
};

exports.fetchUserDetail = async (req, res) => {
  const { id } = req.params;
  await User.findOne({ _id: id })
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(404).json({ success: false, data: "User Not Found" });
    });
};
