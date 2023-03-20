import React, { useState, useEffect } from "react";
import AddProject from "./components/Project/Project.js";
import AddTicket from "./components/AddTicket/AddTicket.js";
import CurrentTicket from "./components/CurrentTicket/CurrentTicket.js";
import Sidebar from "./components/sideBar/sideBar.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import NavBar from "./components/navbar/navbar.js";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [showAddTicket, setShowAddTicket] = useState(false);
  const [showCurrentTicket, setShowCurrentTicket] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("user") !== null;
    if(!isAuthenticated){
      navigate("/");
    }
  }, []);
  

  const user = JSON.parse(sessionStorage.getItem("user")) || {};
  const { Name, Email, Role } = user.user || {};

  console.log(user);

  const handleTicketCreated = () => {
    setShowAddTicket(false);
    setShowCurrentTicket(true);
    window.location.reload();
  };

  const handleAddTicketClick = () => {
    if (Role !== "team leader") {
      alert("You do not have permission to add a ticket.");
    } else {
      setShowAddTicket(true);
      setShowCurrentTicket(false);
      setShowProject(false)
    }
  };

  const handleCurrentTicketClick = () => {
    setShowAddTicket(false);
    setShowCurrentTicket(true);
    setShowProject(false)
  };

  const handleDashboardClick = () => {
    setShowAddTicket(false);
    setShowCurrentTicket(false);
    setShowProject(false)
  };

  const handleNewProjectClick = () => {
    setShowProject(true)
    setShowAddTicket(false);
    setShowCurrentTicket(false);
  };
  return (
    <div className="container-fluid">
      <NavBar
      user={user.user}
            onAddTicketClick={handleAddTicketClick}
            onCurrentTicketClick={handleCurrentTicketClick}
            onDashboardClick={handleDashboardClick}
            onNewProjectClick={handleNewProjectClick} />
      <div className="row">
      <div className="col-xl-2">
          <Sidebar
            user={user.user}
            onAddTicketClick={handleAddTicketClick}
            onCurrentTicketClick={handleCurrentTicketClick}
            onDashboardClick={handleDashboardClick}
            onNewProjectClick={handleNewProjectClick}
          />
        </div>
        <div className="col-xl-10">
          
          {!showAddTicket && !showCurrentTicket && !showProject && <Dashboard />}
          {showProject &&  Role === "team leader" ? <AddProject /> : []}
          {showAddTicket && Role === "team leader" ? (
            <AddTicket onTicketCreated={handleTicketCreated} />
          ) : showCurrentTicket && <CurrentTicket />}
          {showAlert && (
            <div className="alert-container">
              <div className="alert">
                <p>
                  You must be a team leader to access the current tickets page.
                </p>
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
