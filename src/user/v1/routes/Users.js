const express = require("express");
const { updateResume, getResume } = require("../controller/User");

const router = express.Router();

router.route("/updateResume").post(updateResume);

router.route("/getResume/:id").get(getResume);

module.exports = router;
