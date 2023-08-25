import React, { useEffect } from "react";
import "../css/BillingCounter.css";

const BillingCounter = ({ counter }) => {
  const { id, customer, queue } = counter;

  useEffect(() => {
    let timer;
    if (customer) {
      if (customer.items > 0) {
        timer = setInterval(() => {
          setCustomer((prevCustomer) => ({
            ...prevCustomer,
            items: prevCustomer.items - 1,
          }));
        }, 150000);
      } else {
        setCustomer(null);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [customer]);

  const setCustomer = (newCustomer) => {
    counter.customer = newCustomer;
  };

  return (
    <div className="billing-counter">
      <h2>Counter {id}</h2>
      {customer ? (
        <>
          <div className="triangle"></div>
          <p>Items: {customer.items}</p>
        </>
      ) : (
        <p>No customer</p>
      )}
      <div className="queue">
        {queue.map((customer) => (
          <div key={customer.id} className="queue-customer">
            <div className="triangle"></div>
            <p>Items: {customer.items}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingCounter;
