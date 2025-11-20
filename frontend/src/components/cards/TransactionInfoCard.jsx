import React from "react";
import { Utensils, TrendingDown, TrendingUp, Trash } from "lucide-react";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
}) => {
  const onDelete = () => {
    console.log("delete");
  };

  const getAmountStyles = () =>
    type === "income"
      ? "text-green-600 bg-green-100/60"
      : "text-red-600 bg-red-100/60";

  return (
    <div className="group relative mt-2 flex items-center gap-4 rounded-lg p-3 hover:bg-gray-100/60">
      <div className="flex size-12 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-800">
        {icon ? (
          <img src={icon} alt={title} className="size-6" />
        ) : (
          <Utensils />
        )}
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <p className="mt-1 text-xs text-gray-500">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="group:hover:opacity-100 cursor-pointer text-red-500 opacity-0 transition-opacity hover:text-red-600"
              onClick={onDelete}
            >
              <Trash size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"}${amount}
            </h6>
            {type === "income" ? <TrendingUp /> : <TrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
