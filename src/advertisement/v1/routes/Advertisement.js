const express = require("express")
const {
    listAds,
    createAd,
    updateAd,
    removeAd,
} = require("../controller/Advertisements")

const router = express.Router();

router.route("/listAds").get(listAds);
router.route("/createAd").post(createAd);
router.route("/updateAd").put(updateAd);
router.route("/deleteAd").delete(removeAd);

module.exports = router;