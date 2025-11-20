import React from "react";
import moment from "moment";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import { ArrowRight } from "lucide-react";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>

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
                title={tx.type == "expense" ? tx.category : tx.source}
                icon={tx.icon}
                date={moment(tx.date).format("DD MMM, YYYY")}
                amount={tx.amount}
                type={tx.type}
                hideDeleteBtn
              ></TransactionInfoCard>
            ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
