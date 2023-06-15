const express = require("express");
const router = express.Router();
const problemController = require("../controllers/problemController");

router.post("/Create", problemController.createProblem);
router.get("/getAll", problemController.getAllProblems);
router.get("/:id", problemController.getProblemById);
router.put("/:id", problemController.updateProblem);
router.delete("/:id", problemController.deleteProblem);

module.exports = router;
