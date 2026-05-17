const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        internship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Internship",
            required: true,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["Applied", "Shortlisted", "Rejected", "Selected"],
            default: "Applied",
        },
        resume: {
            type: String, // Path to resume at time of application
        },
    },
    { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
