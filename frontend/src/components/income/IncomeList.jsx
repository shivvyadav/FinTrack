import React from "react";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";
import { Download } from "lucide-react";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium">Income List</h5>

        {transactions?.length === 0 ? null : (
          <button onClick={onDownload} className="card-btn">
            <Download className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            amount={income.amount}
            date={moment(income.date).format("Do MMM, YYYY")}
            icon={income.icon}
            type="income"
            hideDeleteBtn={false}
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
