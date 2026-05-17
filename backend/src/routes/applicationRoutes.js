const express = require("express");
const {
    applyForInternship,
    getMyApplications,
    getApplicantsForInternship,
    updateApplicationStatus
} = require("../controllers/applicationController");
const { verifyJWT, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyJWT);

// Student routes
router.route("/apply").post(authorize("STUDENT"), applyForInternship);
router.route("/my-applications").get(authorize("STUDENT"), getMyApplications);

// Recruiter routes
router.route("/applicants/:internshipId").get(authorize("RECRUITER"), getApplicantsForInternship);
router.route("/status/:applicationId").patch(authorize("RECRUITER"), updateApplicationStatus);

module.exports = router;
