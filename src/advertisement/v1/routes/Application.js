const express = require("express");
const router = express.Router();

const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
  getApplicationsByAdId,
  getApplicationsByUserId,
} = require("../controller/Applications");

// Middleware fonksiyonu
const validateIdParam = (req, res, next) => {
  // İsteğin parametrelerini doğrula
  if (!req.params.id) {
    return res.status(400).json({ error: "Missing ID parameter" });
  }
  next();
};

// Tüm başvuruları getir
router.get("/getAll", getAllApplications);

// Yeni bir başvuru oluştur
router.post("/create", createApplication);

// Belirli bir başvuruyu ID'ye göre getir
router.get("/getById/:id", validateIdParam, getApplicationById);

// Belirli başvuruları ilan ID'ye göre getir
router.get("/getByAdId/:id", validateIdParam, getApplicationsByAdId);

// Belirli başvuruları kullanıcı ID'ye göre getir
router.get("/getByUserId/:id", validateIdParam, getApplicationsByUserId);

// Belirli bir başvuruyu güncelle
router.put("/update/:id", validateIdParam, updateApplication);

// Belirli bir başvuruyu sil
router.delete("/delete/:id", validateIdParam, deleteApplication);

module.exports = router;
