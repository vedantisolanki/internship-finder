const express = require("express");
const { getMyProfile, updateStudentProfile, updateRecruiterProfile } = require("../controllers/profileController");
const { verifyJWT, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware");

const router = express.Router();

router.use(verifyJWT); // All profile routes need login

router.route("/me").get(getMyProfile);

router.route("/student/update").post(
    authorize("STUDENT"),
    upload.single("resume"),
    updateStudentProfile
);

router.route("/recruiter/update").post(
    authorize("RECRUITER"),
    upload.single("logo"),
    updateRecruiterProfile
);

module.exports = router;
