const {
  list,
  create,
  update,
  remove,
  applyToAd,
} = require("../services/Advertisements");
const httpStatus = require("http-status");
const Advertisement = require("../models/Advertisement");
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

const applyToAdvertisement = (req, res) => {
  applyToAd(req.body)
    .then((result) => {
      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const getAdsByOwnerId = async (req, res) => {
  console.log("objectx :>> ", req.params);
  try {
    const advertisements = await Advertisement.find({
      ad_owner_id: req.params.id,
    });
    if (!advertisements || advertisements.length === 0) {
      return res.status(404).json({ error: "Advertisements not found" });
    }
    res.json(advertisements);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve Advertisements" });
  }
};
// Get a single advertisement by ID
const getAdvertisementById = async (req, res) => {
  try {
    const advertisement = await Advertisement.findById(req.params.id);
    if (!advertisement) {
      return res.status(404).json({ error: "Advertisement not found" });
    }
    res.json(advertisement);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve advertisement" });
  }
};

module.exports = {
  listAds,
  createAd,
  updateAd,
  removeAd,
  applyToAdvertisement,
  getAdsByOwnerId,
  getAdvertisementById,
};
