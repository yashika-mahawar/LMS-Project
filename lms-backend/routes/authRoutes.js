const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { registerUser, loginUser,  getProfile} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
//Admin dashboard only
router.get(
  "/admin/dashboard",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({
      message: "Welcome Admin Dashboard",
    });
  }
);

//student route only
router.get(
  "/student/dashboard",
  authMiddleware,
  roleMiddleware(["student"]),
  (req, res) => {
    res.json({
      message: "Welcome Student Dashboard",
    });
  }
);

module.exports = router;