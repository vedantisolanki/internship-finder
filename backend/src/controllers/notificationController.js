const Notification = require("../models/Notification");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @description Get all notifications for the logged-in user
 */
const getMyNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ recipient: req.user._id })
        .sort("-createdAt")
        .populate("sender", "fullName");

    return res.status(200).json(new ApiResponse(200, notifications, "Notifications fetched successfully"));
});

/**
 * @description Mark a notification as read
 */
const markAsRead = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, recipient: req.user._id },
        { $set: { isRead: true } },
        { new: true }
    );

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    return res.status(200).json(new ApiResponse(200, notification, "Notification marked as read"));
});

/**
 * @description Delete a notification
 */
const deleteNotification = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    const notification = await Notification.findOneAndDelete({
        _id: notificationId,
        recipient: req.user._id
    });

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Notification deleted"));
});

module.exports = {
    getMyNotifications,
    markAsRead,
    deleteNotification,
};
