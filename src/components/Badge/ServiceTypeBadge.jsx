import React, { useState, useEffect } from "react";
import { serviceTypeLabels } from "../../settings/globalStatus";
import { FaBed, FaUtensils, FaGamepad, FaCarSide } from "react-icons/fa";

function ServiceTypeBadge({ index }) {
  const label = serviceTypeLabels[index];
  const iconMap = {
    0: <i className="fas fa-bed"></i>,
    1: <i className="fas fa-utensils"></i>,
    2: <i className="fas fa-gamepad"></i>,
    3: <i className="fas fa-car-side"></i>,
  };
  const icon = iconMap[index];
  const badgeColors = {
    0: "bg-badge-resting", // Lưu trú
    1: "bg-badge-fb", // Ăn uống
    2: "bg-badge-entertaiment", // Vui chơi giải trí
    3: "bg-badge-vehicle text-white", // Cung cấp phương tiện
  };
  console.log(index);
  return (
    <>
      <div
        className={`badge font-medium flex items-center rounded-full px-4 py-4 ${badgeColors[index]}`}
      >
        {icon}
        <span className="ml-2 whitespace-nowrap">{label}</span>
      </div>
    </>
  );
}

export default ServiceTypeBadge;
