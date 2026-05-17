const express = require("express");
const {
    saveInternship,
    removeSavedInternship,
    getSavedInternships
} = require("../controllers/savedInternshipController");
const { verifyJWT, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyJWT, authorize("STUDENT"));

router.route("/").get(getSavedInternships);
router.route("/save").post(saveInternship);
router.route("/remove/:internshipId").delete(removeSavedInternship);

module.exports = router;
