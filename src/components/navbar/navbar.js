// Importing required components and libraries
import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaTachometerAlt, FaTicketAlt, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { AiFillFolderOpen } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import "./navbar.css";

// Defining the NavBar component
function NavBar({ user, onAddTicketClick, onCurrentTicketClick, onDashboardClick, onNewProjectClick }) {

  // Using the useState hook to create a toggle state for mobile devices
  const [toggle, setToggle] = useState(false);

  // Extracting the Name property from the user object, if it exists
  const { Name } = user || {};

  // Creating a navigate object using the useNavigate hook from react-router-dom
  const navigate = useNavigate();

  // Function to handle sign-out button click
  const handleSignOutClick = () => {
    // Display a confirmation dialog box before signing out
    const signOut = window.confirm("Are you sure you want to sign out?");
    if (signOut) {
      // If user confirms sign-out, remove user data from sessionStorage and navigate to the home page
      sessionStorage.removeItem("user");
      navigate("/");
    }
  };

  // Render the NavBar component
  return (

    <Navbar bg="light" expand="lg" className='Navbar'>
      <Container>

        {/* Display the logo */}
        <Navbar.Brand><img src={logo} className="img-fluid navLogo" /></Navbar.Brand>

        {/* Create a toggle button for mobile devices */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Create a collapsible menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {/* Create a list of menu items */}
            <ul className="menu2">

              {/* Menu item to navigate to the dashboard */}
              <li onClick={onDashboardClick}>
                <FaTachometerAlt style={{marginRight:"10px"}}/>
                Dashboard
              </li>

              {/* Menu item to create a new project */}
              <li onClick={onNewProjectClick}>
                <AiFillFolderOpen style={{marginRight:"10px"}} />
                Project
              </li>

              {/* Menu item to view current tickets */}
              <li onClick={onCurrentTicketClick}>
                <FaTicketAlt style={{marginRight:"10px"}}/>
                Tickets
              </li>

              {/* Menu item to add a new ticket */}
              <li onClick={onAddTicketClick}>
                <FaPlus style={{marginRight:"10px"}}/>
                Add Ticket
              </li>

              {/* Menu item to sign out */}
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

// Export the NavBar component
export default NavBar;
