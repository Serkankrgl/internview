const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  advertisementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Advertisement",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  interviewDate: {
    type: String,
  },
  interviewTime: {
    type: String,
  },
  interviewLocation: {
    type: String,
  },
  custom_question: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
