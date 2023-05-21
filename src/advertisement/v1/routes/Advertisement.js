const express = require("express");
const {
  listAds,
  createAd,
  updateAd,
  removeAd,
  applyToAdvertisement,
  getAdsByOwnerId,
  getAdvertisementById,
} = require("../controller/Advertisements");

const router = express.Router();

router.route("/listAds").get(listAds);
router.route("/createAd").post(createAd);
router.route("/updateAd").put(updateAd);
router.route("/deleteAd").delete(removeAd);
router.route("/apply").post(applyToAdvertisement);
router.route("/getAdsByOwnerId/:id").get(getAdsByOwnerId);
router.route("/getAdvertisementById/:id").get(getAdvertisementById);

module.exports = router;
