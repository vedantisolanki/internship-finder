const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser
} = require("../controllers/authController");

const { verifyJWT } = require("../middleware/authMiddleware");

const {
  registerValidationRules,
  loginValidationRules,
  validate
} = require("../middleware/validator");

const router = express.Router();

/**
 * 🔐 Register User
 */
router.post(
  "/signup",
  registerValidationRules(),
  validate,
  registerUser
);

/**
 * 🔐 Login User
 */
router.post(
  "/login",
  loginValidationRules(),
  validate,
  loginUser
);

/**
 * 🔒 Logout User (Protected)
 */
router.post(
  "/logout",
  verifyJWT,
  logoutUser
);

module.exports = router;