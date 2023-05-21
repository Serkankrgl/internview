const Advertisement = require("../models/Advertisement");

const list = (payload) => {
  if (payload) {
    return Advertisement.findById(payload);
  } else {
    return Advertisement.find({});
  }
};

const create = (payload) => {
  const ad = new Advertisement(payload);
  return ad.save();
};
const update = (payload) => {
  Advertisement.findByIdAndUpdate(payload._id, payload);
};
const remove = (payload) => {
  Advertisement.findByIdAndRemove(payload._id);
};

const applyToAd = (payload) => {
  console.log("payload :>> ", payload);
  return Advertisement.updateOne(
    { _id: payload._id },
    { $push: { applications: payload.application } }
  );
};

module.exports = {
  list,
  create,
  update,
  remove,
  applyToAd,
};
