const Internship = require("../models/Internship");
const StudentProfile = require("../models/StudentProfile");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { calculateMatchScore } = require("../utils/matchingScore");

/**
 * @description Get recommended internships for student based on skills
 */
const getRecommendedInternships = asyncHandler(async (req, res) => {
    const profile = await StudentProfile.findOne({ user: req.user._id });

    if (!profile) {
        throw new ApiError(404, "Student profile not found. Please complete your profile to get recommendations.");
    }

    const studentSkills = profile.skills || [];

    // Find all open internships
    const internships = await Internship.find({ status: "Open" }).populate("recruiter", "fullName");

    // Calculate scores and filter
    const scoredInternships = internships
        .map(internship => {
            const score = calculateMatchScore(studentSkills, internship.skillsRequired);
            return {
                ...internship.toObject(),
                matchScore: score
            };
        })
        .filter(item => item.matchScore > 0) // Only show if there's at least some match
        .sort((a, b) => b.matchScore - a.matchScore); // Sort by highest score

    return res.status(200).json(
        new ApiResponse(
            200, 
            scoredInternships.slice(0, 10), // Return top 10
            "Recommendations fetched successfully"
        )
    );
});

module.exports = { getRecommendedInternships };
