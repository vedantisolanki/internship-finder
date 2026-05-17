const SavedInternship = require("../models/SavedInternship");
const Internship = require("../models/Internship");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @description Save an internship (Bookmark)
 */
const saveInternship = asyncHandler(async (req, res) => {
    const { internshipId } = req.body;

    const internship = await Internship.findById(internshipId);
    if (!internship) throw new ApiError(404, "Internship not found");

    const existingSave = await SavedInternship.findOne({
        student: req.user._id,
        internship: internshipId,
    });

    if (existingSave) {
        throw new ApiError(400, "Internship already saved");
    }

    const saved = await SavedInternship.create({
        student: req.user._id,
        internship: internshipId,
    });

    return res.status(201).json(new ApiResponse(201, saved, "Internship saved to bookmarks"));
});

/**
 * @description Remove a saved internship
 */
const removeSavedInternship = asyncHandler(async (req, res) => {
    const { internshipId } = req.params;

    const result = await SavedInternship.findOneAndDelete({
        student: req.user._id,
        internship: internshipId,
    });

    if (!result) {
        throw new ApiError(404, "Saved internship not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Internship removed from bookmarks"));
});

/**
 * @description Get all saved internships for current student
 */
const getSavedInternships = asyncHandler(async (req, res) => {
    const saved = await SavedInternship.find({ student: req.user._id })
        .populate("internship", "title recruiter stipend location duration");

    return res.status(200).json(new ApiResponse(200, saved, "Saved internships fetched successfully"));
});

module.exports = {
    saveInternship,
    removeSavedInternship,
    getSavedInternships,
};
