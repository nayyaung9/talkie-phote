const User = require("../models/User");

exports.getUserLocation = async (req, res) => {
  const { userId } = req.params;
  const { geolocation } = req.body;
  console.log(req.body);

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
