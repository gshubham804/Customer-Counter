import React from "react";
import "../css/customer.css";

const Customer = ({ customer }) => {
  return (
    <div className="customer">
      <div className="triangle"></div>
      <p>Customer Items: {customer.items}</p>
    </div>
  );
};

export default Customer;
