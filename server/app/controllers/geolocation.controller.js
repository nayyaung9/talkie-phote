const User = require("../models/User");

exports.getUserLocation = async (req, res) => {
  const { userId } = req.params;
  const { geolocation } = req.body;

  await User.findOneAndUpdate(
    userId,
    {
      $set: {
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
      },
    },
    { new: true },
  )
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(200).json({ success: true, data: err });
    });
};

exports.findNear = async ({ position, io, userId }) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return [];
  }

  // Update new position
  if (
    !(user.position.coordinates[0] === position[0] && user.position.coordinates[1] === position[1])
  ) {
    user.position = {
      type: `Point`,
      coordinates: position,
    };
    await user.save();
  }

  // Find people near user (radius: 500m)
  const users = await User.find({
    position: {
      $near: {
        $geometry: {
          type: `Point`,
          coordinates: [user.position.coordinates[0], user.position.coordinates[1]],
        },
        $maxDistance: 500,
        $minDistance: 0,
      },
    },
  });

  const usersToEmit = users.map(({ _id, displayName, profilePictureUrl, gender, message }) => ({
    _id,
    displayName,
    profilePictureUrl,
    gender,
    message,
  }));
  console.log(usersToEmit);
  // socket.emit(`found-near`, usersToEmit);
};
