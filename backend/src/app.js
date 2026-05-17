// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const errorHandler = require("./middleware/errorMiddleware");

// const app = express();

// // Middlewares
// app.use(cors({
//     origin: process.env.CORS_ORIGIN || "*",
//     credentials: true
// }));
// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(morgan("dev"));

// // Routes Imports
// const authRoutes = require("./routes/authRoutes");
// const profileRoutes = require("./routes/profileRoutes");
// const internshipRoutes = require("./routes/internshipRoutes");
// const applicationRoutes = require("./routes/applicationRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const savedInternshipRoutes = require("./routes/savedInternshipRoutes");
// const recommendationRoutes = require("./routes/recommendationRoutes");

// // Routes Declaration
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/profiles", profileRoutes);
// app.use("/api/v1/internships", internshipRoutes);
// app.use("/api/v1/applications", applicationRoutes);
// app.use("/api/v1/notifications", notificationRoutes);
// app.use("/api/v1/admin", adminRoutes);
// app.use("/api/v1/saved", savedInternshipRoutes);
// app.use("/api/v1/recommendations", recommendationRoutes);

// // Health Check
// app.get("/health", (req, res) => {
//     res.status(200).json({ status: "OK", message: "Server is running smoothly" });
// });

// // Error Handler Middleware
// app.use(errorHandler);

// module.exports = app;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(morgan("dev"));

// Routes Imports
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const savedInternshipRoutes = require("./routes/savedInternshipRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

// Routes Declaration
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profiles", profileRoutes);
app.use("/api/v1/internships", internshipRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/saved", savedInternshipRoutes);
app.use("/api/v1/recommendations", recommendationRoutes);

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running smoothly"
    });
});

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;