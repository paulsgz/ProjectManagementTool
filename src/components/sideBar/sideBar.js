import React, { useState } from "react";
import "./sideBar.css";
import { FaTachometerAlt, FaTicketAlt, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { AiFillFolderOpen } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

/**
 * A component that displays the sidebar of the application
 * @param {Object} props - Component props
 * @param {Object} props.user - The user object
 * @param {Function} props.onAddTicketClick - The function to handle the "Add Ticket" button click event
 * @param {Function} props.onCurrentTicketClick - The function to handle the "Current Tickets" button click event
 * @param {Function} props.onDashboardClick - The function to handle the "Dashboard" button click event
 * @param {Function} props.onNewProjectClick - The function to handle the "New Project" button click event
 */
function Sidebar({ user, onAddTicketClick, onCurrentTicketClick, onDashboardClick, onNewProjectClick }) {
  // State hook for toggling the sidebar
  const [toggle, setToggle] = useState(false);
  // Destructuring the name property from the user object
  const { Name } = user || {};
  // The navigate function from the react-router-dom package
  const navigate = useNavigate();

  /**
   * Event handler for the "Sign Out" button click event
   */
  const handleSignOutClick = () => {
    const signOut = window.confirm("Are you sure you want to sign out?");
    if (signOut) {
      // Remove the user object from the session storage
      sessionStorage.removeItem("user");
      // Navigate the user to the home page
      navigate("/");
    }
  };

  return (
    <div className="sidebar">
      {/* The application logo and user name */}
      <div className="Sidelogo">
        <img src={logo} className="img-fluid" alt="logo" />
        <div className="profile">
          <h4>Hi {Name}</h4>
        </div>
      </div>
      {/* The sidebar menu */}
      <ul className="menu">
        <li onClick={onDashboardClick}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </li>
        <li onClick={onNewProjectClick}>
          <AiFillFolderOpen />
          <span>New Project</span>
        </li>
        <li onClick={onCurrentTicketClick}>
          <FaTicketAlt />
          <span>Current Tickets</span>
        </li>
        <li onClick={onAddTicketClick}>
          <FaPlus />
          <span>Add Ticket</span>
        </li>
        <li onClick={handleSignOutClick}>
          <FaSignOutAlt />
          <span>Sign Out</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
