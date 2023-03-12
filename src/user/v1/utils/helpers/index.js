const cryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const passwordToHash = (Password) => {
  return cryptoJS
    .HmacSHA256(
      Password,
      cryptoJS.HmacSHA1(Password, process.env.PASSWORD_HASH).toString()
    )
    .toString();
};

const generateAccessToken = (user) => {
  return JWT.sign(
    { name: user.email, ...user },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "1w",
    }
  );
};
const generateRefreshToken = (user) => {
  return JWT.sign(
    { name: user.email, ...user },
    process.env.REFRESH_TOKEN_SECRET_KEY
  );
};

module.exports = {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
};
