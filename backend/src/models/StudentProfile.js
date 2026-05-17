const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        bio: {
            type: String,
        },
        skills: [
            {
                type: String,
            },
        ],
        education: [
            {
                institution: String,
                degree: String,
                fieldOfStudy: String,
                startYear: Number,
                endYear: Number,
            },
        ],
        resume: {
            type: String, // Path to resume file
        },
        location: {
            type: String,
        },
        projects: [
            {
                title: String,
                description: String,
                link: String,
            },
        ],
        experience: [
            {
                company: String,
                role: String,
                duration: String,
            },
        ],
    },
    { timestamps: true }
);

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);

module.exports = StudentProfile;
