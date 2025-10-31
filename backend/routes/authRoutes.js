const express = require("express");
const {requireAuth} = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  sendOTP,
  verifyOTP,
  loginUser,
  getUser,
  logoutUser,
} = require("../controllers/authController");

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);
router.get("/user", requireAuth, getUser);
router.post("/logout", logoutUser);

module.exports = router;
