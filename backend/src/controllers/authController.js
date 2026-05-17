const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * 🔐 REGISTER USER
 */
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, role, phoneNumber } = req.body;

    if (!fullName || !email || !password || !role) {
        throw new ApiError(400, "All fields are required");
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        fullName: fullName.trim(),
        email: normalizedEmail,
        password,
        role: role.toUpperCase(),
        phoneNumber
    });

    const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

/**
 * 🔐 LOGIN USER (MAIN FIX AREA)
 */
const loginUser = asyncHandler(async (req, res) => {
    console.log("LOGIN BODY:", req.body); // 🔥 DEBUG

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = user.generateAccessToken();

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken
                },
                "Login successful"
            )
        );
});

/**
 * 🔐 LOGOUT USER
 */
const logoutUser = asyncHandler(async (req, res) => {
    return res.status(200)
        .clearCookie("accessToken")
        .json(new ApiResponse(200, {}, "Logged out successfully"));
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};