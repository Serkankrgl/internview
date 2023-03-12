const { registerUser, list, loginUser } = require("../services/Users");
const httpStatus = require("http-status");
const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/helpers");

const logIn = (req, res) => {
  req.body.password = passwordToHash(req.body.password);

  loginUser(req.body)
    .then((result) => {
      if (!result)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ error: "Kullanıcı bulunamadı." });

      result = {
        ...result.toObject(),
        tokens: {
          access_token: generateAccessToken(result),
          refresh_token: generateRefreshToken(result),
        },
      };
      delete result.password;
      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const signUp = (req, res) => {
  req.body.password = passwordToHash(req.body.password);

  registerUser(req.body)
    .then((result) => {
      res.status(httpStatus.CREATED).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const isAlive = (req, res) => {
  console.log("User Services Alive");
  res.status(httpStatus.OK).send("User Services Alive");
};

const changePassword = (req, res) => {};

module.exports = {
  logIn,
  signUp,
  changePassword,
  isAlive,
};
