const User = require("../models/User");

const updateResumeById = (payload) => {
  const _user = User.findByIdAndUpdate(
    payload._id,
    { resume: payload.resume },
    { new: true }
  );
  return _user;
};

const getResumeById = (payload) => {
  return User.findById(payload, "resume");
};

module.exports = {
  updateResumeById,
  getResumeById,
};
