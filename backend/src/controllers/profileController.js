const StudentProfile = require("../models/StudentProfile");
const RecruiterProfile = require("../models/RecruiterProfile");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @description Create or Update Student Profile
 */
const updateStudentProfile = asyncHandler(async (req, res) => {
    const { bio, skills, education, location, projects, experience } = req.body;
    const resume = req.file ? req.file.path : undefined;

    let profile = await StudentProfile.findOne({ user: req.user._id });

    const profileData = {
    user: req.user._id,
    bio,

    skills: Array.isArray(skills)
        ? skills
        : skills?.split(",").map((s) => s.trim()),

    education: education
        ? JSON.parse(education)
        : [],

    location,

    projects: projects
        ? JSON.parse(projects)
        : [],

    experience: experience
        ? JSON.parse(experience)
        : [],
};

    if (resume) profileData.resume = resume;

    if (profile) {
        profile = await StudentProfile.findOneAndUpdate(
            { user: req.user._id },
            { $set: profileData },
            { new: true }
        );
    } else {
        profile = await StudentProfile.create(profileData);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, profile, "Profile updated successfully"));
});

/**
 * @description Get Current User Profile
 */
const getMyProfile = asyncHandler(async (req, res) => {
    let profile;
    if (req.user.role === "STUDENT") {
        profile = await StudentProfile.findOne({ user: req.user._id }).populate("user", "fullName email phoneNumber");
    } else if (req.user.role === "RECRUITER") {
        profile = await RecruiterProfile.findOne({ user: req.user._id }).populate("user", "fullName email phoneNumber");
    }

    if (!profile) {
        throw new ApiError(404, "Profile not found");
    }

    return res.status(200).json(new ApiResponse(200, profile, "Profile fetched successfully"));
});

/**
 * @description Create or Update Recruiter Profile
 */
const updateRecruiterProfile = asyncHandler(async (req, res) => {
    const { companyName, companyWebsite, companyBio, companyLocation, industry } = req.body;
    const companyLogo = req.file ? req.file.path : undefined;

    let profile = await RecruiterProfile.findOne({ user: req.user._id });

    const profileData = {
        user: req.user._id,
        companyName,
        companyWebsite,
        companyBio,
        companyLocation,
        industry,
    };

    if (companyLogo) profileData.companyLogo = companyLogo;

    if (profile) {
        profile = await RecruiterProfile.findOneAndUpdate(
            { user: req.user._id },
            { $set: profileData },
            { new: true }
        );
    } else {
        profile = await RecruiterProfile.create(profileData);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, profile, "Recruiter profile updated successfully"));
});

module.exports = {
    updateStudentProfile,
    getMyProfile,
    updateRecruiterProfile,
};
