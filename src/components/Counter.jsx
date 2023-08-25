import React from 'react';

const Counter = ({ counterNumber, customer }) => {
  return (
    <div className="counter">
      <h2>Counter {counterNumber}</h2>
      {customer && (
        <>
          <div className="triangle"></div>
          <p>Customer Items: {customer.items}</p>
        </>
      )}
    </div>
  );
};

export default Counter;