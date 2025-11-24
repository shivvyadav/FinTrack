import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="bg-foreground text-primary border-border flex gap-6 rounded-2xl border p-6 shadow transition-colors duration-300">
      <div
        className={`${color} flex size-14 items-center justify-center rounded-full text-[26px]`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-secondary mb-1 text-sm">{label}</h6>
        <span className="text-[22px]">$ {value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
