const User = require("../models/User");
const Point = require("../models/Point");

exports.getUserLocation = async (req, res) => {
  const { userId } = req.params;
  const { geolocation } = req.body;

  console.log("geolocation", geolocation);

  let user = await User.findOne({ _id: userId });

  try {
    // let newPoint = new Point({
    //   _user: user._id,
    //   coordinates: geolocation,
    // });

    // await newPoint.save();

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          position: [geolocation[0], geolocation[1]],
        },
      },
      {
        new: true,
      },
    ).then((data) => {
      console.log("data", data);
      return res.status(200).json({ success: true, data: data });
    });
  } catch (err) {
    console.log("Err", err);
    return res.status(500).json({ success: false, data: err });
  }
};

exports.findNear = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return [];
  }

  // Find people near user (radius: 500m)
  const users = await User.find({
    position: {
      $near: {
        $geometry: {
          type: `Point`,
          coordinates: [user.position[0], user.position[1]],
        },
        $maxDistance: 500,
        $minDistance: 0,
      },
    },
  });

  console.log(users);
  return res.status(200).json({ success: true, data: users });
  // socket.emit(`found-near`, users);
};

// exports.findNear = async ({ position, io, userId }) => {
//   const user = await User.findOne({ _id: userId });
//   if (!user) {
//     return [];
//   }

//   // Update new position
//   if (
//     !(user.position.coordinates[0] === position[0] && user.position.coordinates[1] === position[1])
//   ) {
//     user.position = {
//       type: `Point`,
//       coordinates: position,
//     };
//     await user.save();
//   }

//   // Find people near user (radius: 500m)
//   const users = await User.find({
//     position: {
//       $near: {
//         $geometry: {
//           type: `Point`,
//           coordinates: [user.position.coordinates[0], user.position.coordinates[1]],
//         },
//         $maxDistance: 500,
//         $minDistance: 0,
//       },
//     },
//   });

//   const usersToEmit = users.map(({ _id, displayName, profilePictureUrl, gender, message }) => ({
//     _id,
//     displayName,
//     profilePictureUrl,
//     gender,
//     message,
//   }));
//   console.log(usersToEmit);
//   // socket.emit(`found-near`, usersToEmit);
// };
