const { list, create, update, remove } = require("../services/Advertisements");
const httpStatus = require("http-status");

const listAds = (req, res) => {
  console.log("object :>> ");
  list(req.body._id)
    .then((result) => {
      if (!result) {
        return res
          .httpStatus(httpStatus.NOT_FOUND)
          .send({ error: "İlan Bulunamadı" });
      }

      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const createAd = (req, res) => {
  console.log("req.body :>> ", req.body);
  create(req.body)
    .then((result) => {
      res.status(httpStatus.CREATED).send(result);
    })
    .catch((err) => {
      console.log("err :>> ", err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const updateAd = (req, res) => {
  update(req.body)
    .then((result) => {
      res.status(httpStatus[200]).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const removeAd = (req, res) => {
  remove(req.body)
    .then((result) => {
      res.status(httpStatus[202]).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

module.exports = {
  listAds,
  createAd,
  updateAd,
  removeAd,
};
