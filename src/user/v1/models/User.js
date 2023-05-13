const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    full_name: String,
    email: String,
    password: String,
    resume: {
      full_name: String,
      phone: String,
      email: String,
      about_me: String,
      educations: [Mongoose.Schema.Types.Mixed],
      experiences: [Mongoose.Schema.Types.Mixed],
      skills: [String],
      hobbies: [String],
      referances: [Mongoose.Schema.Types.Mixed],
      certificates: [Mongoose.Schema.Types.Mixed],
      trophies: [Mongoose.Schema.Types.Mixed],
    },
    profile_image: String,
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("user", UserSchema);
