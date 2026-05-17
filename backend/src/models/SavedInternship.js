const mongoose = require("mongoose");

const savedInternshipSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        internship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Internship",
            required: true,
        },
    },
    { timestamps: true }
);

// Prevent duplicate saves
savedInternshipSchema.index({ student: 1, internship: 1 }, { unique: true });

const SavedInternship = mongoose.model("SavedInternship", savedInternshipSchema);

module.exports = SavedInternship;
