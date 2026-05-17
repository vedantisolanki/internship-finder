const Internship = require("../models/Internship");
const StudentProfile = require("../models/StudentProfile");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @description Create Internship (Recruiter only)
 */
const createInternship = asyncHandler(async (req, res) => {
    const { title, description, skillsRequired, location, stipend, duration, type, category, openings } = req.body;

    const internship = await Internship.create({
        title,
        description,
        skillsRequired: Array.isArray(skillsRequired) ? skillsRequired : skillsRequired.split(",").map(s => s.trim()),
        location,
        stipend,
        duration,
        type,
        category,
        openings,
        recruiter: req.user._id,
    });

    return res.status(201).json(new ApiResponse(201, internship, "Internship posted successfully"));
});

/**
 * @description Get All Internships with Filters
 */
const getAllInternships = asyncHandler(async (req, res) => {
    const { skills, location, type, stipend, search } = req.query;
    let query = { status: "Open" };

    if (skills) {
        query.skillsRequired = { $in: skills.split(",") };
    }
    if (location) {
        query.location = { $regex: location, $options: "i" };
    }
    if (type) {
        query.type = type;
    }
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }

    const internships = await Internship.find(query).populate("recruiter", "fullName");
    return res.status(200).json(new ApiResponse(200, internships, "Internships fetched successfully"));
});

/**
 * @description Get Internship Details
 */
const getInternshipById = asyncHandler(async (req, res) => {
    const internship = await Internship.findById(req.params.id).populate("recruiter", "fullName email");
    if (!internship) throw new ApiError(404, "Internship not found");

    return res.status(200).json(new ApiResponse(200, internship, "Internship details fetched"));
});

/**
 * @description Recommend Internships for Student
 */
const recommendInternships = asyncHandler(async (req, res) => {
    const profile = await StudentProfile.findOne({ user: req.user._id });
    if (!profile) throw new ApiError(404, "Student profile not found. Please complete profile first.");

    const studentSkills = profile.skills || [];
    
    // Simple matching: internships that require at least one of student's skills
    const recommendations = await Internship.find({
        status: "Open",
        skillsRequired: { $in: studentSkills }
    }).limit(10);

    return res.status(200).json(new ApiResponse(200, recommendations, "Recommended internships fetched"));
});

/**
 * @description Update Internship (Recruiter only)
 */
const updateInternship = asyncHandler(async (req, res) => {
    let internship = await Internship.findById(req.params.id);
    if (!internship) throw new ApiError(404, "Internship not found");

    if (internship.recruiter.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to update this internship");
    }

    internship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(new ApiResponse(200, internship, "Internship updated successfully"));
});

/**
 * @description Delete Internship (Recruiter only)
 */
const deleteInternship = asyncHandler(async (req, res) => {
    const internship = await Internship.findById(req.params.id);
    if (!internship) throw new ApiError(404, "Internship not found");

    if (internship.recruiter.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to delete this internship");
    }

    await Internship.findByIdAndDelete(req.params.id);
    return res.status(200).json(new ApiResponse(200, {}, "Internship deleted successfully"));
});

module.exports = {
    createInternship,
    getAllInternships,
    getInternshipById,
    recommendInternships,
    updateInternship,
    deleteInternship
};
