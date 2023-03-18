import React, { useState } from "react";
import "./sideBar.css";
import "./sideBar.scss";
import { FaTachometerAlt, FaTicketAlt, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { AiFillFolderOpen } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";

function Sidebar({ user, onAddTicketClick, onCurrentTicketClick, onDashboardClick, onNewProjectClick }) {
  const [toggle, setToggle] = useState(false);
  const { Name } = user || {};
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    const signOut = window.confirm("Are you sure you want to sign out?");
    if (signOut) {
      sessionStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} className="img-fluid" />
        <div className="profile">
          <h4>Hi {Name}</h4>
        </div>
      </div>
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

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [-150, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
        
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
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
