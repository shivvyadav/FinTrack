const Income = require("../models/Income");
const XLSX = require("xlsx");

//add income
exports.addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const {icon, source, amount, date} = req.body;
    if (!source || !amount || !date) {
      return res.status(400).json({success: false, message: "All fields are required"});
    }
    const newIncome = await Income.create({userId, icon, source, amount, date});
    res.status(201).json({success: true, message: "Income added successfully", newIncome});
  } catch (err) {
    res.status(500).json({success: false, message: "Failed to add income"});
  }
};

//get income
exports.getAllIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomes = await Income.find({userId}).sort({date: -1});
    res.status(200).json({success: true, incomes});
  } catch (err) {
    res.status(500).json({success: false, message: "Failed to fetch incomes"});
  }
};

//delete income
exports.deleteIncome = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedIncome = await Income.findByIdAndDelete(id);
    if (!deletedIncome) {
      return res.status(404).json({success: false, message: "Income not found"});
    }
    res.status(200).json({success: true, message: "Income deleted successfully"});
  } catch (err) {
    res.status(500).json({success: false, message: "Failed to delete income"});
  }
};

//download income
exports.downloadIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomes = await Income.find({userId}).sort({date: -1});

    const data = incomes.map((income) => ({
      Source: income.source,
      Amount: income.amount,
      Date: income.date.toISOString().split("T")[0],
    }));

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Incomes");
    XLSX.writeFile(workbook, "incomes.xlsx");
    res.download("incomes.xlsx");
  } catch (err) {
    res.status(500).json({success: false, message: "Failed to download incomes"});
  }
};
