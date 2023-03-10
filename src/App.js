import React, { useState } from "react";
import AddTicket from "./components/AddTicket/AddTicket.js";
import CurrentTicket from "./components/CurrentTicket/CurrentTicket.js";
import Sidebar from "./components/sideBar/sideBar.js";
import "./App.css";

function App() {
  const [addTicket, setAddTicket] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user")) || {};
  const { Name, Email, Role } = user.user || {};
  

  console.log(user);

  const handleTicketCreated = () => {
    setAddTicket(true);
    window.location.reload();
  };

  const showAddTicket = () => {
    if (Role !== "team leader") {
      alert("You do not have permission to add a ticket.");
    } else {
      setAddTicket(true);
    }
  };

  const showCurrentTicket = () => {
    setAddTicket(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <Sidebar />
        </div>
        <div className="col-sm-10">
          <div className="card-container">
            {addTicket && Role === "team leader" ? (
             <AddTicket onTicketCreated={handleTicketCreated} />
            ) : (
              <CurrentTicket />
            )}
          </div>
          <div>
            <div className="selection">
              <button
                onClick={showCurrentTicket}
                className={
                  !addTicket && Role !== "team leader"
                    ? "view-button active-button"
                    : addTicket
                    ? "view-button"
                    : "view-button active-button"
                }
              >
                Current Tickets
              </button>
              <button
                onClick={showAddTicket}
                className={
                  addTicket && Role === "team leader"
                    ? "view-button active-button"
                    : "view-button"
                }
              >
                Add Ticket
              </button>
            </div>
          </div>
          {showAlert && (
            <div className="alert-container">
              <div className="alert">
                <p>You must be a team leader to access the current tickets page.</p>
                <button onClick={() => setShowAlert(false)}>OK</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
