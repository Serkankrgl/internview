const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    full_name: String,
    email: String,
    password: String,
    profile_image: String,
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("user", UserSchema);
