import React, { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../../helpers/utils";
import CustomLineChart from "../charts/CustomLineChart";
const Last60DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium">Last 60 Days Expenses</h5>
      </div>

      <CustomLineChart data={chartData} />
    </div>
  );
};

export default Last60DaysExpenses;
