const { Room } = require("../models/Room");
const { Chat, EventType } = require("../models/Chat");

exports.createRoom = async (req, res) => {
  const { roomName, user: getAdminAsUser, admin, privacy } = req.body;
  let findRoom = await Room.findOne({ name: roomName });

  if (!findRoom) {
    try {
      let room = new Room({
        name: roomName,
        admin,
        users: getAdminAsUser,
        privacy,
      });

      await room.save();

      let createdMessage = new Chat({
        roomId: room.code,
        message: "created",
        event_type: EventType.SERVER,
        sender: admin,
      });
      await createdMessage.save();

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
  await Room.find({ privacy: 0 })
    .populate("users", "-email -__v")
    .populate("admin", "-__v -email")
    .limit(100)
    .then((data) => {
      return res.status(200).json({ status: true, data });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, data: err.message });
    });
};

exports.fetchRoomById = async (req, res) => {
  const { id } = req.params;

  await Room.findOne({ code: id })
    .populate("users", "-email -__v")
    .populate("admin", "-__v -email")
    .then((data) => {
      return res.status(200).json({ status: true, data });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, data: err.message });
    });
};

exports.joinRoom = async (req, res) => {
  const { roomId, user } = req.body;

  let foundRoom = await Room.findOne({ code: roomId });

  if (foundRoom) {
    let createdMessage = new Chat({
      roomId,
      message: "joined",
      event_type: EventType.JOIN,
      sender: user,
    });
    await createdMessage.save();

    try {
      await Room.findOneAndUpdate(
        { _id: foundRoom._id },
        {
          $push: {
            users: user,
          },
        },
        { new: true }
      ).then((data) => {
        return res.status(200).json({ status: true, data });
      });
    } catch (err) {
      return res.status(500).json({ status: true, data: err });
    }
  } else {
    return res.status(500).json({ status: true, data: err });
  }
};
