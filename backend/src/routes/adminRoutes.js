const express = require("express");
const {
    getAllUsers,
    getAllInternshipsAdmin,
    deleteInternshipAdmin,
    getAllRecruiters,
    getAllApplicationsAdmin,
    deleteUser
} = require("../controllers/adminController");
const { verifyJWT } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

// Apply Admin protection to all routes
router.use(verifyJWT, isAdmin);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.get("/internships", getAllInternshipsAdmin);
router.delete("/internships/:id", deleteInternshipAdmin);

router.get("/recruiters", getAllRecruiters);
router.get("/applications", getAllApplicationsAdmin);

module.exports = router;
