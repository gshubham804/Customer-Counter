import React, { useState, useEffect } from "react";
import BillingCounter from "./components/BillingCounter";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [counters, setCounters] = useState([
    { id: "C1", customer: null, queue: [] },
    { id: "C2", customer: null, queue: [] },
    { id: "C3", customer: null, queue: [] },
    { id: "C4", customer: null, queue: [] },
    { id: "C5", customer: null, queue: [] },
  ]);

  const [incomingQueue, setIncomingQueue] = useState([]);

  const addIncomingCustomer = () => {
    const newCustomer = {
      id: Date.now(),
      items: Math.floor(Math.random() * 10) + 1,
    };
    setIncomingQueue([...incomingQueue, newCustomer]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Reduce items for each customer in the counters
      setCounters((prevCounters) => {
        return prevCounters.map((counter) => {
          if (counter.customer && counter.customer.items > 0) {
            return {
              ...counter,
              customer: {
                ...counter.customer,
                items: counter.customer.items - 1,
              },
            };
          }
          return counter;
        });
      });

      // Remove customers with 0 items from the counters
      setCounters((prevCounters) => {
        return prevCounters.map((counter) => {
          if (counter.customer && counter.customer.items === 0) {
            return { ...counter, customer: null };
          }
          return counter;
        });
      });

      // Send incoming customers to the counters with the least or equal number of customers in line
      if (incomingQueue.length > 0) {
        const availableCounters = counters.filter(
          (counter) => !counter.customer
        );
        const minItems = Math.min(
          ...availableCounters.map((counter) => counter.queue.length)
        );
        const eligibleCounters = availableCounters.filter(
          (counter) => counter.queue.length === minItems
        );

        if (eligibleCounters.length > 0) {
          const customerToAdd = incomingQueue.shift();
          setIncomingQueue([...incomingQueue]);
          setCounters((prevCounters) => {
            return prevCounters.map((counter) => {
              if (counter.id === eligibleCounters[0].id) {
                return { ...counter, customer: customerToAdd };
              }
              return counter;
            });
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [counters, incomingQueue]);

  return (
    <div className="app">
      <div className="billing-counter-container">
        <div className="billing-counter-header">
          <h1>Billing Counters</h1>
        </div>
        <div className="billing-counters">
          <div className="counters">
            {counters.map((counter) => (
              <BillingCounter key={counter.id} counter={counter} />
            ))}
          </div>
        </div>
      </div>
      <div className="incoming-queue">
        <h2>Incoming Customer Queue</h2>
        {incomingQueue.map((customer) => (
          <div key={customer.id} className="customer">
            <div className="triangle"></div>
            <p>Items: {customer.items}</p>
          </div>
        ))}
        <button onClick={addIncomingCustomer}>Add Incoming Customer</button>
      </div>
    </div>
  );
};

export default App;
