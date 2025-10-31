const express = require("express");
const {
  addExpense,
  deleteExpense,
  getAllExpense,
  downloadExpense,
} = require("../controllers/expenseController");

const {requireAuth} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-expense", requireAuth, addExpense);
router.get("/get-expense", requireAuth, getAllExpense);
router.delete("/delete-expense/:id", requireAuth, deleteExpense);
router.get("/download-expense", requireAuth, downloadExpense);

module.exports = router;
