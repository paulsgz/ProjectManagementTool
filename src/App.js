import React, { useState } from "react";
import AddTicket from "./components/AddTicket/AddTicket.js";
import CurrentTicket from "./components/CurrentTicket/CurrentTicket.js";
import "./App.css";

function App() {
  const [addTicket, setAddTicket] = useState(true);

  const showAddTicket = () => {
    setAddTicket(true);
  };

  const showCurrentTicket = () => {
    setAddTicket(false);
  };

  return (
    <div className="App">
      <h1>Project Management Tool</h1>
      <div className="card-container">
        {addTicket ? <AddTicket /> : <CurrentTicket />}
      </div>
      <div>
        <div className="selection">
          <button
            onClick={showCurrentTicket}
            className={!addTicket ? "view-button" : "view-button active-button"}
          >
            Current Tickets
          </button>
          <button
            onClick={showAddTicket}
            className={addTicket ? "view-button" : "view-button active-button"}
          >
            Add Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;