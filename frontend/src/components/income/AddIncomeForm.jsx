import React, { useState } from "react";
import EmojuPickerPopup from "../EmojuPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    amount: "",
    source: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  return (
    <form className="mx-auto w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-sm">
      <EmojuPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      {/* Source */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-600">
          Income Source
        </label>
        <input
          value={income.source}
          onChange={(e) => handleChange("source", e.target.value)}
          placeholder="e.g. Salary, Freelance"
          type="text"
          className="rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Amount */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-600">Amount</label>
        <input
          value={income.amount}
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
          value={income.date}
          onChange={(e) => handleChange("date", e.target.value)}
          type="date"
          className="rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => onAddIncome(income)}
          className="w-full rounded-xl bg-blue-600 py-2 font-medium text-white transition-all duration-200 hover:bg-blue-700"
        >
          Add Income
        </button>
      </div>
    </form>
  );
};

export default AddIncomeForm;
