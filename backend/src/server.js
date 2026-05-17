const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
const app = require("./app");

// Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const savedInternshipRoutes = require("./routes/savedInternshipRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

// Load env
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

console.log("MONGODB_URI:", process.env.MONGODB_URI);

const PORT = process.env.PORT || 5000;

// 🔥 REGISTER ALL ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profiles", profileRoutes);
app.use("/api/v1/internships", internshipRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/saved", savedInternshipRoutes);
app.use("/api/v1/recommendations", recommendationRoutes);
app.use("/api/v1/resume", resumeRoutes);

// Connect DB + start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n ⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!!", err);
  });