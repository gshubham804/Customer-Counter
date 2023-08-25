import React from "react";
import Customer from "./Customer";
import "../css/queue.css";

const Queue = ({ queue }) => {
  return (
    <div className="queue">
      {queue.map((customer) => (
        <Customer key={customer.id} customer={customer} />
      ))}
    </div>
  );
};

export default Queue;
