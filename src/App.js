import React, { useState, useEffect } from "react";
import AddProject from "./components/Project/Project.js"; // Import the AddProject component
import AddTicket from "./components/AddTicket/AddTicket.js"; // Import the AddTicket component
import CurrentTicket from "./components/CurrentTicket/CurrentTicket.js"; // Import the CurrentTicket component
import Sidebar from "./components/sideBar/sideBar.js"; // Import the Sidebar component
import Dashboard from "./components/Dashboard/Dashboard.js"; // Import the Dashboard component
import NavBar from "./components/navbar/navbar.js"; // Import the NavBar component
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from React Router
import "./App.css"; // Import the custom CSS for the App component

function App() {
  const [showAddTicket, setShowAddTicket] = useState(false); // State to show or hide the AddTicket component
  const [showCurrentTicket, setShowCurrentTicket] = useState(false); // State to show or hide the CurrentTicket component
  const [showProject, setShowProject] = useState(false); // State to show or hide the AddProject component
  const [showAlert, setShowAlert] = useState(false); // State to show or hide alerts
  const navigate = useNavigate(); // The useNavigate hook allows us to navigate between routes programmatically
  const [sidebarVisible, setSidebarVisible] = useState(false); // State to show or hide the Sidebar component

  // This useEffect hook runs when the component mounts, and checks if the user is authenticated.
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("user") !== null;
    if(!isAuthenticated){
      navigate("/");
    }
  }, []);

  const user = JSON.parse(sessionStorage.getItem("user")) || {}; // Get the user object from session storage, or an empty object if it doesn't exist
  const { Name, Email, Role } = user.user || {}; // Extract the Name, Email, and Role properties from the user object

  console.log(user); // Log the user object to the console for debugging purposes

  // This function is called when a new ticket is created.
  // It hides the AddTicket component, shows the CurrentTicket component, and reloads the window.
  const handleTicketCreated = () => {
    setShowAddTicket(false);
    setShowCurrentTicket(true);
    window.location.reload();
  };

  // This function is called when the "Add Ticket" button is clicked.
  // It shows the AddTicket component if the user has the "team leader" role, and hides the CurrentTicket and AddProject components.
  // If the user doesn't have the "team leader" role, it shows an alert.
  const handleAddTicketClick = () => {
    if (Role !== "team leader") {
      alert("You do not have permission to add a ticket.");
    } else {
      setShowAddTicket(true);
      setShowCurrentTicket(false);
      setShowProject(false)
    }
  };

  // This function is called when the "Current Ticket" button is clicked.
  // It shows the CurrentTicket component and hides the AddTicket and AddProject components.
  const handleCurrentTicketClick = () => {
    setShowAddTicket(false);
    setShowCurrentTicket(true);
    setShowProject(false)
  };

  // This function is called when the "Dashboard" button is clicked.
  // It hides the AddTicket, CurrentTicket, and AddProject components.
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
