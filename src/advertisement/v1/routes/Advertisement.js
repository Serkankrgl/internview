const express = require("express");
const {
  listAds,
  createAd,
  updateAd,
  removeAd,
  applyToAdvertisement,
  getAdsByOwnerId,
  getAdvertisementById,
  getApplyedAdvertisement,
} = require("../controller/Advertisements");

const router = express.Router();

router.route("/listAds").get(listAds);
router.route("/createAd").post(createAd);
router.route("/updateAd").put(updateAd);
router.route("/deleteAd/:id").delete(removeAd);
router.route("/apply").post(applyToAdvertisement);
router.route("/getAdsByOwnerId/:id").get(getAdsByOwnerId);
router.route("/getAdvertisementById/:id").get(getAdvertisementById);
router.route("/advertisements/:userId").get(getApplyedAdvertisement);

module.exports = router;
