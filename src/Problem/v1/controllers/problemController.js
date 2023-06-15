const Problem = require("../models/Problem");

// Problem ekleme
exports.createProblem = (req, res) => {
  console.log("req.body :>> ", req.body);
  const problemData = req.body;
  const problem = new Problem(problemData);

  problem
    .save()
    .then((savedProblem) => {
      res.json(savedProblem);
    })
    .catch((error) => {
      console.log("error :>> ", error);
      res.status(500).json({ error: "Problem kaydedilemedi." });
    });
};

// Tüm problemleri listeleme
exports.getAllProblems = (req, res) => {
  Problem.find()
    .then((problems) => {
      res.json(problems);
    })
    .catch((error) => {
      res.status(500).json({ error: "Problemler alınamadı." });
    });
};

// Belirli bir problemi görüntüleme
exports.getProblemById = (req, res) => {
  const problemId = req.params.id;

  Problem.findById(problemId)
    .then((problem) => {
      if (!problem) {
        return res.status(404).json({ error: "Problem bulunamadı." });
      }
      res.json(problem);
    })
    .catch((error) => {
      res.status(500).json({ error: "Problem alınamadı." });
    });
};

// Problem güncelleme
exports.updateProblem = (req, res) => {
  const problemId = req.params.id;
  const problemData = req.body;

  Problem.findByIdAndUpdate(problemId, problemData, { new: true })
    .then((updatedProblem) => {
      if (!updatedProblem) {
        return res.status(404).json({ error: "Problem bulunamadı." });
      }
      res.json(updatedProblem);
    })
    .catch((error) => {
      res.status(500).json({ error: "Problem güncellenemedi." });
    });
};

// Problem silme
exports.deleteProblem = (req, res) => {
  const problemId = req.params.id;

  Problem.findByIdAndRemove(problemId)
    .then((deletedProblem) => {
      if (!deletedProblem) {
        return res.status(404).json({ error: "Problem bulunamadı." });
      }
      res.json({ message: "Problem başarıyla silindi." });
    })
    .catch((error) => {
      res.status(500).json({ error: "Problem silinemedi." });
    });
};
