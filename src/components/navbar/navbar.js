import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaTachometerAlt, FaTicketAlt, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { AiFillFolderOpen } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import "./navbar.css";


function NavBar({ user, onAddTicketClick, onCurrentTicketClick, onDashboardClick, onNewProjectClick }) {
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

    <Navbar bg="light" expand="lg" className='Navbar'>
    <Container>
      <Navbar.Brand><img src={logo} className="img-fluid navLogo" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <ul className="menu2">
        <li onClick={onDashboardClick}>
          <FaTachometerAlt style={{marginRight:"10px"}}/>
         Dashboard
        </li>
        <li onClick={onNewProjectClick}>
          <AiFillFolderOpen style={{marginRight:"10px"}} />
         Project
        </li>
        <li onClick={onCurrentTicketClick}>
          <FaTicketAlt style={{marginRight:"10px"}}/>
         Tickets
        </li>
        <li onClick={onAddTicketClick}>
          <FaPlus style={{marginRight:"10px"}}/>
         Add Ticket
        </li>

        <li onClick={handleSignOutClick}>
          <FaSignOutAlt style={{marginRight:"10px"}} />
         Sign Out
        </li>
      </ul>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavBar;