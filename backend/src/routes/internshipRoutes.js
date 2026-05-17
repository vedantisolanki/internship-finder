const express = require("express");
const {
    createInternship,
    getAllInternships,
    getInternshipById,
    recommendInternships,
    updateInternship,
    deleteInternship
} = require("../controllers/internshipController");
const { verifyJWT, authorize } = require("../middleware/authMiddleware");
const { internshipValidationRules, validate } = require("../middleware/validator");

const router = express.Router();

// Public routes
router.route("/all").get(getAllInternships);
router.route("/:id").get(getInternshipById);

// Secured routes
router.use(verifyJWT);

router.route("/post").post(authorize("RECRUITER"), internshipValidationRules(), validate, createInternship);
router.route("/recommendations").get(authorize("STUDENT"), recommendInternships);

router.route("/update/:id").patch(authorize("RECRUITER"), internshipValidationRules(), validate, updateInternship);
router.route("/delete/:id").delete(authorize("RECRUITER"), deleteInternship);

module.exports = router;
