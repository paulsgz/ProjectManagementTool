import React from "react";
import "./sideBar.css";
import { FaTachometerAlt, FaTicketAlt, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { AiFillFolderOpen } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Sidebar({ user, onAddTicketClick, onCurrentTicketClick, onDashboardClick, onNewProjectClick }) {
  const { Name } = user || {};
  const navigate = useNavigate();

 
  const handleSignOutClick = () => {
    const signOut = window.confirm("Are you sure you want to sign out?");
    if(signOut){
      sessionStorage.removeItem("user");
      navigate('/');
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>PMT Pro</h2>
        <div className="profile">
          <h4>Hi {Name}</h4>
        </div>
      </div>
      <ul>
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
