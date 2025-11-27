import React from "react";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";
import { Download } from "lucide-react";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium">Expense List</h5>
        {transactions?.length === 0 ? null : (
          <button onClick={onDownload} className="card-btn">
            <Download className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            amount={expense.amount}
            date={moment(expense.date).format("Do MMM, YYYY")}
            icon={expense.icon}
            type="expense"
            hideDeleteBtn={false}
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
