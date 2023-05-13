const User = require("../models/User");

const registerUser = (payload) => {
  const user = new User(payload);
  return user.save();
};
const loginUser = (payload) => {
  return User.findOne(payload);
};
const list = () => {
  return User.find({});
};

module.exports = {
  registerUser,
  list,
  loginUser,
};
