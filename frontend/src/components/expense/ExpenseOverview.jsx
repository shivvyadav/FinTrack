import React, { useState, useEffect } from "react";
import { prepareExpenseLineChartData } from "../../helpers/utils";
import CustomLineChart from "../charts/CustomLineChart";
import { Plus } from "lucide-react";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  console.log(chartData);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-medium">Expense Overview</h5>
          <p className="mt-0.5 text-sm text-gray-400">
            Track your expense trends over the past 2 months with this visual
            overview.
          </p>
        </div>

        <button className="add-btn" onClick={onAddExpense}>
          <Plus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
