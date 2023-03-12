const checkUser = async (req, res, next) => {};

const authenticateToken = async (req, res, next) => {
  console.log(req.params);
  next();
};

module.exports = { authenticateToken };
