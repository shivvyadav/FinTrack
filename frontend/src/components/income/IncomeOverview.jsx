import React, { useState, useEffect } from "react";
import { prepareIncomeBarChartData } from "../../helpers/utils";
import CustomBarChart from "../charts/CustomBarChart";

import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-medium">Income Overview</h5>
          <p className="mt-0.5 text-sm text-gray-400">
            Track your income trends over the past 2 months with this visual
            overview.
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <Plus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-6">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
