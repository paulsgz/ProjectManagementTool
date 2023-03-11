import React from "react";
import "./sideBar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <h1>Project Management Tool</h1>
        <div className="profile">
          <img src={null} alt="Profile Pic" />
          <h4>John Doe</h4>
        </div>
      </div>
      <ul>
        <li>Dashboard</li>
        <li>Current Tickets</li>
        <li>Add Ticket</li>
      </ul>
    </div>
  );
}

export default Sidebar;
