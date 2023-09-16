import React from 'react';

const DataItem = ({ data }) => {
  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
      <img src={data.image} alt="Item" />
    </div>
    
  );
};

export default DataItem;
