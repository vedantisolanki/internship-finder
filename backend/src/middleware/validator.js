const { body, validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

/**
 * 🔍 Handle validation errors
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = errors.array().map((err) => ({
        field: err.path,
        message: err.msg
    }));

    return next(new ApiError(422, "Validation failed", extractedErrors));
};

/**
 * 🔐 Register Validation
 */
const registerValidationRules = () => {
    return [
        body("fullName")
            .trim()
            .notEmpty()
            .withMessage("Full name is required"),

        body("email")
            .isEmail()
            .withMessage("Must be a valid email address"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),

        body("role")
  .isIn(["STUDENT", "RECRUITER", "ADMIN"])
  .withMessage("Invalid role")
    ];
};

/**
 * 🔐 Login Validation
 */
const loginValidationRules = () => {
    return [
        body("email")
            .isEmail()
            .withMessage("Must be a valid email address"),

        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ];
};

/**
 * 📌 Internship Validation
 */
const internshipValidationRules = () => {
    return [
        body("title")
            .trim()
            .notEmpty()
            .withMessage("Title is required"),

        body("description")
            .notEmpty()
            .withMessage("Description is required"),

        body("skillsRequired")
            .notEmpty()
            .withMessage("Skills are required"),

        body("location")
            .notEmpty()
            .withMessage("Location is required"),

        body("stipend")
            .notEmpty()
            .withMessage("Stipend is required"),

        body("duration")
            .notEmpty()
            .withMessage("Duration is required")
    ];
};

module.exports = {
    registerValidationRules,
    loginValidationRules,
    internshipValidationRules,
    validate,
};