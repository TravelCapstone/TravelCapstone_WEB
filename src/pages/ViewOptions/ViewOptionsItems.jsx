import React from 'react';
import ViewOptionCard from './ViewOptionCard/ViewOptionCard';

const ViewOptionsItems = ({ options }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {options.map((option, index) => (
        <ViewOptionCard key={index} option={option} />
      ))}
    </div>
  );
};

export default ViewOptionsItems;
