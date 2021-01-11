var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    uniqueId: {
      type: String,
    },
    avatar_url: {
      type: String,
      default: null,
    },
    position: {
      type: Schema.Types.Array,
      ref: "Point",
    },
    deviceToken: {
      type: "String",
      default: null,
    },
  },

  {
    timestamps: true,
  },
);

UserSchema.index({ position: `2dsphere` });

module.exports = mongoose.model("User", UserSchema);
