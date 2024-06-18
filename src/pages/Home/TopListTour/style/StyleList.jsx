// src/components/StyledList.js
import React from "react";
import StyledCard from "./StyleCard";

const StyledList = ({ items }) => {
  console.log("items", items);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <StyledCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default StyledList;
