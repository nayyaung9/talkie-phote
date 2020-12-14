const Room = require("../models/Room");
// const Message = require("../models/User");

exports.createRoom = async (req, res) => {
  const { roomName, user: getAdminAsUser, admin } = req.body;
  console.log(req.body);
  let findRoom = await Room.findOne({ name: roomName });

  if (!findRoom) {
    try {
      let room = new Room({
        name: roomName,
        admin,
        users: getAdminAsUser,
      });

      await room.save();

      return res.status(200).json({ status: true, data: room });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, data: "Failed to create room" });
    }
  } else {
    return res
      .status(500)
      .json({ status: false, data: "Room is already existed" });
  }
};

exports.fetchAllRooms = async (req, res) => {
  await Room.find()
    .populate("users", "-email -__v")
    .populate("admin", "-__v -email")
    .limit(100)
    .sort({ createdAt: -1 })
    .then((data) => {
      return res.status(200).json({ status: true, data });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, data: err.message });
    });
};
