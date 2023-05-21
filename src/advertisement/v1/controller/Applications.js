const Application = require("../models/Application");

// Create a new application
const createApplication = async (req, res) => {
  console.log("req.body :>> ", req.body);
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: "Failed to create application" + error });
  }
};

// Get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve applications" });
  }
};

// Get a single application by ID
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve application" });
  }
};

// Update an application
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: "Failed to update application" });
  }
};

// Delete an application
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete application" });
  }
};

// Get applications by advertisement ID
const getApplicationsByAdId = async (req, res) => {
  try {
    const applications = await Application.find({
      advertisementId: req.params.id,
    });
    if (!applications) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve application" });
  }
};

const getApplicationsByUserId = async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.params.id,
    });
    if (!applications) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve application" });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getApplicationsByAdId,
  getApplicationsByUserId,
};
