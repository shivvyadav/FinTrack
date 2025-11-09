const Expense = require("../models/Expense");
const XLSX = require("xlsx");

//add expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const {icon, category, amount, date} = req.body;
    if (!category || !amount || !date) {
      return res.status(400).json({success: false, message: "All fields are required"});
    }
    const newExpense = await Expense.create({userId, icon, category, amount, date});
    res.status(201).json({success: true, message: "Expense added successfully", newExpense});
  } catch (err) {
    res.status(500).json({success: false, message: "Failed to add expense"});
  }
};

//get expense
exports.getAllExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({userId}).sort({date: -1});
    res.status(200).json({success: true, expenses});
  } catch (err) {
    res.status(500).json({success: false, message: "Failed to fetch expenses"});
  }
};

//delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const {id} = req.params;
    const deleteExpense = await Expense.findByIdAndDelete(id);
    if (!deleteExpense) {
      return res.status(404).json({success: false, message: "Expense not found"});
    }
    res.status(200).json({success: true, message: "Expense deleted successfully"});
  } catch (err) {
    res.status(500).json({success: false, message: "Failed to delete expense"});
  }
};

//download income
exports.downloadExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({userId}).sort({date: -1});

    const data = expenses.map((expense) => ({
      Category: expense.category,
      Amount: expense.amount,
      Date: expense.date.toISOString().split("T")[0],
    }));

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "expenses.xlsx");
    res.download("expenses.xlsx");
  } catch (err) {
    res.status(500).json({success: false, message: "Failed to download expenses"});
  }
};
