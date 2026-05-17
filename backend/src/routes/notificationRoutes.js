const express = require("express");
const {
    getMyNotifications,
    markAsRead,
    deleteNotification
} = require("../controllers/notificationController");
const { verifyJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyJWT);

router.route("/").get(getMyNotifications);
router.route("/read/:notificationId").patch(markAsRead);
router.route("/delete/:notificationId").delete(deleteNotification);

module.exports = router;
