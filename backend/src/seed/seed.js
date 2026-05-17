const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const Internship = require("../models/Internship");
const StudentProfile = require("../models/StudentProfile");
const RecruiterProfile = require("../models/RecruiterProfile");
const Application = require("../models/Application");

dotenv.config({ path: "./.env" });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected for seeding...");

        // Clear existing data
        await User.deleteMany();
        await Internship.deleteMany();
        await StudentProfile.deleteMany();
        await RecruiterProfile.deleteMany();
        await Application.deleteMany();

        console.log("Cleared existing data.");

        // 1. Create Admin
        await User.create({
            fullName: "System Admin",
            email: "admin@example.com",
            password: "password123",
            role: "ADMIN"
        });

        // 2. Create Recruiters
        const recruiter = await User.create({
            fullName: "John Recruiter",
            email: "recruiter@example.com",
            password: "password123",
            role: "RECRUITER"
        });

        await RecruiterProfile.create({
            user: recruiter._id,
            companyName: "Tech Solutions Inc.",
            companyBio: "Leading tech solutions provider",
            companyLocation: "Bangalore"
        });

        // 3. Create Students
        const student = await User.create({
            fullName: "Jane Student",
            email: "student@example.com",
            password: "password123",
            role: "STUDENT"
        });

        await StudentProfile.create({
            user: student._id,
            bio: "Passionate developer looking for backend roles",
            skills: ["JavaScript", "Node.js", "React", "MongoDB"],
            location: "Mumbai"
        });

        // 4. Create Internships
        const internships = await Internship.insertMany([
            {
                title: "Backend Developer Intern",
                description: "Work on high-performance Node.js APIs.",
                recruiter: recruiter._id,
                skillsRequired: ["Node.js", "Express", "MongoDB"],
                location: "Remote",
                stipend: "20,000",
                duration: "6 months",
                type: "Remote"
            },
            {
                title: "Frontend Intern",
                description: "Help build modern React components.",
                recruiter: recruiter._id,
                skillsRequired: ["React", "CSS", "HTML"],
                location: "Hybrid",
                stipend: "15,000",
                duration: "3 months",
                type: "Hybrid"
            }
        ]);

        // 5. Create Applications
        await Application.create({
            internship: internships[0]._id,
            student: student._id,
            status: "Applied",
            resume: "uploads/resume-sample.pdf"
        });

        console.log("✅ Seed data inserted successfully!");
        process.exit();
    } catch (error) {
        console.error("❌ Seeding failed: ", error);
        process.exit(1);
    }
};

seedData();
