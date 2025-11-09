const User = require("../models/User");
const Otp = require("../models/Otp");
const {hashPassword, comparePassword} = require("../services/hashService");
const {generateAccessToken, generateRefreshToken} = require("../services/jwtService");
const {sendMail} = require("../services/mailService");
const {requireAuth} = require("../middlewares/authMiddleware");

const isDev = process.env.NODE_ENV !== "production";

// send otp
exports.sendOTP = async (req, res) => {
  try {
    const {email} = req.body;
    const existingUser = await User.findOne({email}).lean();
    if (existingUser) return res.status(400).json({message: "User already exists"});

    const existingOtp = await Otp.findOne({email}).lean();
    if (existingOtp) return res.status(400).json({message: "Verification code already sent"});

    const verificationCode = String(Math.floor(Math.random() * 900000) + 100000);
    await Otp.create({email, otp: verificationCode});
    await sendMail(email, verificationCode);

    res.status(201).json({success: true, message: "Verification code sent successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal server error"});
  }
};

// verify otp
exports.verifyOTP = async (req, res) => {
  try {
    const {email, otp, name, password} = req.body;
    const record = await Otp.findOne({email, otp}).lean();
    if (!record) return res.status(400).json({success: false, message: "Invalid OTP"});

    const hashed = await hashPassword(password);
    await User.create({name, email, password: hashed});

    res.json({success: true, message: "User registered successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false, message: "Verification failed"});
  }
};

// login
exports.loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email}).lean();
    if (!user) return res.status(400).json({success: false, message: "User not found"});

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({success: false, message: "Invalid password"});

    const accessToken = generateAccessToken({id: user._id});
    const refreshToken = generateRefreshToken({id: user._id});

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: !isDev,
      sameSite: isDev ? "Lax" : "None",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !isDev,
      sameSite: isDev ? "Lax" : "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({success: true, message: "Logged in successful", user});
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false, message: "Login failed"});
  }
};

//get user
exports.getUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({success: true, user});
};

//logout
exports.logoutUser = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({success: true, message: "Logged out successfully"});
};
