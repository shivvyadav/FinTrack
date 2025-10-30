const jwt = require("jsonwebtoken");

exports.generateAccessToken = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});

exports.generateRefreshToken = (payload) =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});

exports.verifyAccessToken = (token) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

exports.verifyRefreshToken = (token) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
