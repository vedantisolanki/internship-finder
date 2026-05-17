const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        recruiter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        skillsRequired: [
            {
                type: String,
                required: true,
            },
        ],
        location: {
            type: String,
            required: true,
        },
        stipend: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["Remote", "Hybrid", "On-site"],
            default: "On-site",
        },
        category: {
            type: String,
        },
        applicationDeadline: {
            type: Date,
        },
        openings: {
            type: Number,
            default: 1,
        },
        status: {
            type: String,
            enum: ["Open", "Closed"],
            default: "Open",
        },
    },
    { timestamps: true }
);

const Internship = mongoose.model("Internship", internshipSchema);

module.exports = Internship;
