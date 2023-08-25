import React from "react";
import "../css/CustomerQueue.css";

const CustomerQueue = ({ queue }) => {
  return (
    <div className="customer-queue">
      {queue.map((customer, index) => (
        <div key={customer.id} className="queue-customer">
          <div className="triangle"></div>
          <p>Items: {customer.items}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerQueue;
