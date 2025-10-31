const express = require("express");

const {getDashboardData} = require("../controllers/dashboardController");

const {requireAuth} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", requireAuth, getDashboardData);

module.exports = router;
