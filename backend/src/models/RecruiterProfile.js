const mongoose = require("mongoose");

const recruiterProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        companyWebsite: {
            type: String,
        },
        companyBio: {
            type: String,
        },
        companyLocation: {
            type: String,
        },
        industry: {
            type: String,
        },
        companyLogo: {
            type: String, // Path to company logo
        },
    },
    { timestamps: true }
);

const RecruiterProfile = mongoose.model("RecruiterProfile", recruiterProfileSchema);

module.exports = RecruiterProfile;
