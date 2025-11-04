const {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} = require("../services/jwtService");
const isDev = process.env.NODE_ENV !== "production";

exports.requireAuth = async (req, res, next) => {
  try {
    const {accessToken, refreshToken} = req.cookies || {};

    if (!accessToken && !refreshToken)
      return res.status(401).json({success: false, message: "No token provided"});

    //  verifying access token first
    try {
      const decoded = verifyAccessToken(accessToken);
      req.user = decoded; // attach user info to request
      return next();
    } catch (err) {}

    // If access token invalid/expired, try refresh token
    if (refreshToken) {
      try {
        const decodedRefresh = verifyRefreshToken(refreshToken);
        // Generate a new access token
        const newAccessToken = generateAccessToken({id: decodedRefresh.id});

        // Set the new access token in cookies
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: !isDev,
          sameSite: isDev ? "Lax" : "None",
          maxAge: 15 * 60 * 1000,
        });
        req.user = decodedRefresh;
        return next();
      } catch (err) {
        return res
          .status(403)
          .json({success: false, message: "Session expired, please log in again"});
      }
    }
    return res.status(401).json({success: false, message: "Unauthorized access"});
  } catch (err) {
    res.status(500).json({success: false, message: "Server error"});
  }
};
