const express = require("express");
const {
  addIncome,
  deleteIncome,
  getAllIncome,
  downloadIncome,
} = require("../controllers/incomeController");

const {requireAuth} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-income", requireAuth, addIncome);
router.get("/get-income", requireAuth, getAllIncome);
router.delete("/delete-income/:id", requireAuth, deleteIncome);
router.get("/download-income", requireAuth, downloadIncome);

module.exports = router;
