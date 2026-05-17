const express = require("express");
const { getRecommendedInternships } = require("../controllers/recommendationController");
const { verifyJWT, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyJWT, authorize("STUDENT"));

router.route("/").get(getRecommendedInternships);

module.exports = router;
