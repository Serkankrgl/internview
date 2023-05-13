const express = require("express");
const { logIn, signUp, isAlive } = require("../controller/Registries");
const router = express.Router();
const validate = require("../utils/middlewares/validate"); //validation middleware
const validationSchemas = require("../models/validations/User"); //validation

router.route("/login").post(validate(validationSchemas.loginValidation), logIn);

router
  .route("/signup")
  .post(validate(validationSchemas.createValidation), signUp);

router.get("/isAlive", isAlive);
module.exports = router;
