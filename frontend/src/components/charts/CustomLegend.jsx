import React from "react";

const CustonLegend = ({ payload }) => {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2 space-x-6">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center space-x-2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm font-medium text-gray-700">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustonLegend;
