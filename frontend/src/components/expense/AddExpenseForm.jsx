import React, { useState } from "react";
import EmojuPickerPopup from "../EmojuPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  return (
    <form className="mx-auto w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-sm">
      <EmojuPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-600">Expense</label>
        <input
          value={expense.source}
          onChange={(e) => handleChange("category", e.target.value)}
          placeholder="e.g. Rent, Groceries"
          type="text"
          className="rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Amount */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-600">Amount</label>
        <input
          value={expense.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          placeholder="Enter amount"
          type="number"
          className="rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Date */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-600">Date</label>
        <input
          value={expense.date}
          onChange={(e) => handleChange("date", e.target.value)}
          type="date"
          className="rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => onAddExpense(expense)}
          className="w-full rounded-xl bg-blue-600 py-2 font-medium text-white transition-all duration-200 hover:bg-blue-700"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
