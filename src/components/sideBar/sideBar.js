import React from "react";
import "./sideBar.css";
import { FaTachometerAlt, FaTicketAlt, FaPlus } from "react-icons/fa";

function Sidebar({ user }) {
  const { Name } = user || {};

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>PMT Pro</h2>
        <div className="profile">
          <h4>Hi {Name}</h4>
        </div>
      </div>
      <ul>
        <li>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </li>
        <li>
          <FaTicketAlt />
          <span>Current Tickets</span>
        </li>
        <li>
          <FaPlus />
          <span>Add Ticket</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
