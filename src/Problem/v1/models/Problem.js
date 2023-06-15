const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    functionText: {
      type: String,
      required: true,
    },
    testCases: [
      {
        params: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
