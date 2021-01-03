"use strict";

const User = require("../models/User");
const CONFIG = require("../../config/db");

exports.authenticate = async (req, res) => {
  const { email, fullname, avatar_url } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });

  if (!user) {
    try {
      let newUser = new User({
        fullname,
        email,
        avatar_url,
      });
      const result = await newUser.save();

      return res.status(200).json({ success: true, data: result });
    } catch (err) {
      return res.status(500).json({ success: false, data: err.message });
    }
  } else {
    try {
      let existedUser = await User.findOneAndUpdate(
        {
          _id: user._id,
        },
        { $set: req.body },
        { new: true },
      );
      return res.status(200).json({ success: true, data: existedUser });
    } catch (err) {
      return res.status(500).json({ success: false, data: err.message });
    }
  }
};
