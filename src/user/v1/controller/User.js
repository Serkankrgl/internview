const { updateResumeById, getResumeById } = require("../services/User");
const httpStatus = require("http-status");
const updateResume = (req, res) => {
  updateResumeById(req.body)
    .then((result) => {
      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const getResume = (req, res) => {
  console.log("body:", req.params);

  getResumeById(req.params.id)
    .then((result) => {
      console.log("result :>> ", result);
      if (!result)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ error: "Kullanıcı bulunamadı." });

      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

module.exports = {
  updateResume,
  getResume,
};
