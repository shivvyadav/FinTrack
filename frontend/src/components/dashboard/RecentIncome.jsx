import React from "react";
import moment from "moment";
import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium">Income</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <ArrowRight size={16} />
        </button>
      </div>

      <div className="mt-6">
        {transactions.length > 0 &&
          transactions
            .slice(0, 5)
            .map((tx) => (
              <TransactionInfoCard
                key={tx._id}
                title={tx.source}
                icon={tx.icon}
                date={moment(tx.date).format("Do MMM, YYYY")}
                amount={tx.amount}
                type="income"
                hideDeleteBtn
              ></TransactionInfoCard>
            ))}
      </div>
    </div>
  );
};

export default RecentIncome;
