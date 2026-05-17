const ApiError = require("../utils/ApiError");

/**
 * @description Middleware to restrict access to ADMIN only
 */
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "ADMIN") {
        next();
    } else {
        return next(new ApiError(403, "Access denied. Admin privileges required."));
    }
};

module.exports = isAdmin;
