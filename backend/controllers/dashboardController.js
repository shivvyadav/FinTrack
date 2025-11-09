const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000); // 60 days ago

    // 🔹 Aggregate total income and expense
    const [totalIncomeAgg, totalExpenseAgg] = await Promise.all([
      Income.aggregate([{$match: {userId}}, {$group: {_id: null, total: {$sum: "$amount"}}}]),
      Expense.aggregate([{$match: {userId}}, {$group: {_id: null, total: {$sum: "$amount"}}}]),
    ]);

    const totalIncome = totalIncomeAgg[0]?.total || 0;
    const totalExpense = totalExpenseAgg[0]?.total || 0;
    const totalBalance = totalIncome - totalExpense;

    // 🔹 Last 60 days income & expense
    const [last60daysIncomeTransaction, last60daysExpenseTransaction] = await Promise.all([
      Income.find({userId, date: {$gte: sixtyDaysAgo}})
        .sort({date: -1})
        .lean(),
      Expense.find({userId, date: {$gte: sixtyDaysAgo}})
        .sort({date: -1})
        .lean(),
    ]);

    const last60daysIncomeBalance = last60daysIncomeTransaction.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );
    const last60daysExpenseBalance = last60daysExpenseTransaction.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    // 🔹 Get recent income and expense transactions (limit 5 each)
    const [incomes, expenses] = await Promise.all([
      Income.find({userId}).sort({date: -1}).limit(5).lean(),
      Expense.find({userId}).sort({date: -1}).limit(5).lean(),
    ]);

    // 🔹 Add type field to each
    const typedIncomes = incomes.map((tx) => ({...tx, type: "income"}));
    const typedExpenses = expenses.map((tx) => ({...tx, type: "expense"}));

    // 🔹 Merge and sort by date
    const recentTransactions = [...typedIncomes, ...typedExpenses]
      .sort((a, b) => b.date - a.date)
      .slice(0, 10); // top 10 recent combined

    // 🔹 Send response
    res.status(200).json({
      success: true,
      totalIncome,
      totalExpense,
      totalBalance,
      recentTransactions,
      last60daysIncomeTransaction,
      last60daysIncomeBalance,
      last60daysExpenseTransaction,
      last60daysExpenseBalance,
    });
  } catch (err) {
    console.error("Dashboard data error:", err);
    res.status(500).json({success: false, message: "Failed to fetch dashboard data"});
  }
};
