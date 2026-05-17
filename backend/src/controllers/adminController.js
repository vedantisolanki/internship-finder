const User = require("../models/User");
const Internship = require("../models/Internship");
const Application = require("../models/Application");
const RecruiterProfile = require("../models/RecruiterProfile");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @description Get all users with basic info
 */
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").sort("-createdAt");
    return res.status(200).json(new ApiResponse(200, users, "All users fetched"));
});

/**
 * @description Get all internships (including closed ones)
 */
const getAllInternshipsAdmin = asyncHandler(async (req, res) => {
    const internships = await Internship.find().populate("recruiter", "fullName email");
    return res.status(200).json(new ApiResponse(200, internships, "All internships fetched"));
});

/**
 * @description Delete any internship
 */
const deleteInternshipAdmin = asyncHandler(async (req, res) => {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) throw new ApiError(404, "Internship not found");
    
    return res.status(200).json(new ApiResponse(200, {}, "Internship deleted by admin"));
});

/**
 * @description Get all recruiters and their profiles
 */
const getAllRecruiters = asyncHandler(async (req, res) => {
    const recruiters = await RecruiterProfile.find().populate("user", "fullName email phoneNumber");
    return res.status(200).json(new ApiResponse(200, recruiters, "All recruiters fetched"));
});

/**
 * @description View all applications in the system
 */
const getAllApplicationsAdmin = asyncHandler(async (req, res) => {
    const applications = await Application.find()
        .populate("student", "fullName email")
        .populate("internship", "title recruiter");
    return res.status(200).json(new ApiResponse(200, applications, "All applications fetched"));
});

/**
 * @description Delete a user
 */
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new ApiError(404, "User not found");
    return res.status(200).json(new ApiResponse(200, {}, "User removed from system"));
});

module.exports = {
    getAllUsers,
    getAllInternshipsAdmin,
    deleteInternshipAdmin,
    getAllRecruiters,
    getAllApplicationsAdmin,
    deleteUser
};
