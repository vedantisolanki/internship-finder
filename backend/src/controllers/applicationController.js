const Application = require("../models/Application");
const Internship = require("../models/Internship");
const Notification = require("../models/Notification");
const StudentProfile = require("../models/StudentProfile");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @description Apply for Internship
 */
const applyForInternship = asyncHandler(async (req, res) => {
    const { internshipId } = req.body;

    const internship = await Internship.findById(internshipId);
    if (!internship) throw new ApiError(404, "Internship not found");

    if (internship.status === "Closed") {
        throw new ApiError(400, "Applications for this internship are closed");
    }

    // Check for duplicate application
    const existingApplication = await Application.findOne({
        internship: internshipId,
        student: req.user._id,
    });

    if (existingApplication) {
        throw new ApiError(400, "You have already applied for this internship");
    }

    const studentProfile = await StudentProfile.findOne({ user: req.user._id });
    const resume = studentProfile?.resume;

    const application = await Application.create({
        internship: internshipId,
        student: req.user._id,
        resume: resume || "",
    });

    // Notify recruiter
    await Notification.create({
        recipient: internship.recruiter,
        sender: req.user._id,
        message: `New application received for your post: ${internship.title}`,
        type: "Application",
        link: `/applications/${application._id}`,
    });

    return res.status(201).json(new ApiResponse(201, application, "Application submitted successfully"));
});

/**
 * @description Get My Applications (Student)
 */
const getMyApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find({ student: req.user._id })
        .populate("internship", "title recruiter stipend location");

    return res.status(200).json(new ApiResponse(200, applications, "Applications fetched successfully"));
});

/**
 * @description Get Applicants for an Internship (Recruiter)
 */
const getApplicantsForInternship = asyncHandler(async (req, res) => {
    const { internshipId } = req.params;

    const internship = await Internship.findById(internshipId);
    if (!internship) throw new ApiError(404, "Internship not found");

    if (internship.recruiter.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to view applicants for this internship");
    }

    const applicants = await Application.find({ internship: internshipId })
        .populate("student", "fullName email phoneNumber")
        .sort("-createdAt");

    return res.status(200).json(new ApiResponse(200, applicants, "Applicants fetched successfully"));
});

/**
 * @description Update Application Status (Recruiter)
 */
const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body; // Shortlisted, Rejected, Selected

    if (!["Shortlisted", "Rejected", "Selected"].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    const application = await Application.findById(applicationId).populate("internship", "title");
    if (!application) throw new ApiError(404, "Application not found");

    // Check if the user is the recruiter of the internship
    const internship = await Internship.findById(application.internship);
    if (internship.recruiter.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to update application status");
    }

    application.status = status;
    await application.save();

    // Notify student
    await Notification.create({
        recipient: application.student,
        sender: req.user._id,
        message: `Your application for ${application.internship.title} has been updated to: ${status}`,
        type: "Application",
    });

    return res.status(200).json(new ApiResponse(200, application, `Application status updated to ${status}`));
});

module.exports = {
    applyForInternship,
    getMyApplications,
    getApplicantsForInternship,
    updateApplicationStatus,
};
