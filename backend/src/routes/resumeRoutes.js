const express = require("express");
const router = express.Router();

const { analyzeResume } = require("../controllers/resumeController");
const upload = require("../middleware/resumeUpload");
const { verifyJWT } = require("../middleware/authMiddleware");

router.post(
  "/analyze",
  verifyJWT,
  upload.single("resume"),

  // 🔥 DEBUG STEP (temporary)
  (req, res, next) => {
    console.log("FILE FROM ROUTE:", req.file);
    next();
  },

  analyzeResume
);

module.exports = router;