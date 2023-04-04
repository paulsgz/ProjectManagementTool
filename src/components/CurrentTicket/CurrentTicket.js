import React, { useState, useEffect } from "react";
import "./CurrentTicket.css";
import axios from "axios";
import Modal from 'react-modal';

const url = "https://pmtserver.onrender.com";

function CurrentTicket() {
  // States
  const [data, setData] = useState([]); // Store data retrieved from the server
  const [description, setDescription] = useState(""); // Store the new description input
  const [developer, setDeveloper] = useState(""); // Store the new developer input
  const [priority, setPriority] = useState(""); // Store the new priority input
  const [status, setStatus] = useState(""); // Store the new status input
  const [showModal, setShowModal] = useState(false); // Control the visibility of the edit modal
  const [developersList, setDevelopersList] = useState([]); // Store the list of developers retrieved from the server
  const [ticketID, setTicketID] = useState(""); // Store the ID of the ticket being edited
  const [sortOrder, setSortOrder] = useState("ascending"); // Store the current sorting order
  const [projectsList, setProjectsList] = useState(["All Projects"]); // Store the list of projects retrieved from the server
  const [filterBy, setFilterBy] = useState("All Projects"); // Store the current filter

  // Fetch data from the server on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://pmtserver.onrender.com");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // Fetch data from the server whenever the data state changes
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://pmtserver.onrender.com");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [data]);

  // Fetch the list of developers and projects from the server on component mount
  useEffect(() => {
    async function fetchDevelopers() {
      try {
        const response = await axios.get("https://pmtserver.onrender.com/accounts");
        const response2 = await axios.get("https://pmtserver.onrender.com/projects");
        setDevelopersList(response.data.map((developer) => developer.Name));
        setProjectsList(response2.data.map((project) => project.Name));
      } catch (error) {
        console.error(error);
      }
    }
    fetchDevelopers();
  }, []);

  // Delete a ticket from the server
  const deletePost = async (id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (shouldDelete) {
      try {
        await axios.delete(`https://pmtserver.onrender.com/${id}`);
        alert("Ticket deleted successfully!");
        setData((prevData) => prevData.filter((ticket) => ticket._id !== id));
        const response = await axios.get("https://pmtserver.onrender.com");
        setData(response.data);
      } catch (error) {
        console.log(error);
        alert("An error occurred while deleting the ticket.");
      }
    }
  }

  // Open the edit modal
  const openModal = (id) => {
    setTicketID(id);
    setShowModal(true);
  };

  // Close the edit modal
  const closeModal = () => setShowModal(false);

// Save changes made to a ticket with the given ID by making a PATCH request to the server
// Update the alert message and reset the form fields and ticket ID
// Reload the page and close the modal after the ticket is successfully updated
// Show an error message if an error occurs while updating the ticket
const saveEdit = async (id) => {
  try {
    await axios.patch(`https://pmtserver.onrender.com/${id}`, {
      description: description,
      developer: developer,
      priority: priority,
      status: status,
    });
    alert("Ticket updated successfully!");
    setTicketID("");
    window.location.reload(); // Reload the page
    closeModal();
  } catch (error) {
    console.log(error);
    alert("An error occurred while updating the ticket.");
  }
};

// Toggle the sort order between ascending and descending
const toggleSortOrder = () => {
  if (sortOrder === "ascending") {
    setSortOrder("descending");
  } else {
    setSortOrder("ascending");
  }
};

// Sort the data array based on the priority key and the current sort order
// Order the tickets with higher priorities first
// If the priorities are the same, keep their original order
const sortedData = data.sort((a, b) => {
  if (a.Priority === b.Priority) {
    return 0;
  } else if (sortOrder === "ascending") {
    if (a.Priority === "Critical") {
      return -1;
    } else if (b.Priority === "Critical") {
      return 1;
    } else if (a.Priority === "High") {
      return -1;
    } else if (b.Priority === "High") {
      return 1;
    } else if (a.Priority === "Medium") {
      return -1;
    } else {
      return 1;
    }
  } else {
    if (a.Priority === "Low") {
      return -1;
    } else if (b.Priority === "Low") {
      return 1;
    } else if (a.Priority === "Medium") {
      return -1;
    } else if (b.Priority === "Medium") {
      return 1;
    } else if (a.Priority === "High") {
      return -1;
    } else {
      return 1;
    }
  }
});

// Filter the data array based on the current filter and sorted order
// Show all tickets if the filter is set to "All Projects"
// Otherwise, show only tickets for the selected project
const filteredData =
  filterBy === "All Projects"
    ? sortedData
    : sortedData.filter((ticket) => ticket.Project === filterBy);

// Filter the data array further based on the ticket status
// Show only tickets that are "To do", "In progress", "In review", or "Finished"
const todoTickets = filteredData.filter((ticket) => ticket.Status === "To do");
const inProgressTickets = filteredData.filter(
  (ticket) => ticket.Status === "In progress"
);
const inReviewTickets = filteredData.filter(
  (ticket) => ticket.Status === "In review"
);
const finishedTickets = filteredData.filter(
  (ticket) => ticket.Status === "Finished"
);
function calculatePosition(container) {
  const rect = container.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const top = rect.top + scrollTop;
  const left = rect.left + scrollLeft;
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  return { top, left, width, height };
}

  return (
    <>
    <div className="current-ticket">
       <div className="container-fluid">
        <div className="row firstRow">
    <div>
      <button onClick={toggleSortOrder} className="btn-sm btn-primary sort">
        {sortOrder === "ascending" ? "Sort Priority" : "Sort Priority"}
      </button>
      <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)} className="form-select form-select-sm mb-3" >
  <option value="All Projects">All Projects</option>
  {projectsList.map((project, index) => (
    <option key={index} value={project}>
      {project}
    </option>
  ))}
</select> 
    </div>
</div>
<div className="row">
      <div className="col-xs-3 ticket-section">
        <div className="headings"> <h3>To Do</h3></div>
        {todoTickets.map((ticket, index) => (
        <div key={index} className={`ticket ${ticket.Priority === "Critical" ? "critical" : ticket.Priority === "High" ? "high" : ticket.Priority === "Medium" ? "medium" : "low"}`}>
             <button className="delete-ticket" onClick={() => deletePost(ticket._id)}>
             <i class="fa-sharp fa-solid fa-trash"></i>
            </button>
            <p>{ticket.Description}</p>
            <p>
              Assigned To: <span>{ticket.Developer}</span>
            </p>
            <p>
              Priority: <span>{ticket.Priority}</span>
            </p>
            <p>
              Date Created: <span>{ticket.Date}</span>
            </p>
            <button
            className="edit-ticket"
            onClick={() => {
              openModal();
              setTicketID(ticket._id); // change to ticket._id
              setDescription(ticket.Description); // set the ticket values to the state values 
              setDeveloper(ticket.Developer);
              setPriority(ticket.Priority);
              setStatus(ticket.Status);
            }}
          >
            <i className="fa-sharp fa-solid fa-edit"></i>
          </button>
          </div>
        ))}
  </div>

        <div className="col-xs-3  ticket-section">
        <div className="headings">  <h3>In Progress</h3></div>
          {inProgressTickets.map((ticket, index) => (
         <div key={index} className={`ticket ${ticket.Priority === "Critical" ? "critical" : ticket.Priority === "High" ? "high" : ticket.Priority === "Medium" ? "medium" : "low"}`}>
               <button className="delete-ticket" onClick={() => deletePost(ticket._id)}>
               <i class="fa-sharp fa-solid fa-trash"></i>
              </button>
              <p>{ticket.Description}</p>
              <p>
                Assigned To: <span>{ticket.Developer}</span>
              </p>
              <p>
                Priority: <span>{ticket.Priority}</span>
              </p>
              <p>
              Date Created: <span>{ticket.Date}</span>
            </p>
              <button
            className="edit-ticket"
            onClick={() => {
              openModal();
              setTicketID(ticket._id); // change to ticket._id
              setDescription(ticket.Description); // set the ticket values to the state values 
              setDeveloper(ticket.Developer);
              setPriority(ticket.Priority);
              setStatus(ticket.Status);
            }}
          >
            <i className="fa-sharp fa-solid fa-edit"></i>
          </button>
            </div>
          ))}
        </div>


        <div className="col-xs-3 ticket-section">
        <div className="headings">  <h3>In Review</h3></div>
          {inReviewTickets.map((ticket, index) => (
           <div key={index} className={`ticket ${ticket.Priority === "Critical" ? "critical" : ticket.Priority === "High" ? "high" : ticket.Priority === "Medium" ? "medium" : "low"}`}>
               <button className="delete-ticket" onClick={() => deletePost(ticket._id)}>
               <i class="fa-sharp fa-solid fa-trash"></i>
              </button>
              <p>{ticket.Description}</p>
              <p>
                Assigned To: <span>{ticket.Developer}</span>
              </p>
              <p>
                Priority: <span>{ticket.Priority}</span>
              </p>
              <p>
              Date Created: <span>{ticket.Date}</span>
            </p>
              <button
            className="edit-ticket"
            onClick={() => {
              openModal();
              setTicketID(ticket._id); // change to ticket._id
              setDescription(ticket.Description); // set the ticket values to the state values 
              setDeveloper(ticket.Developer);
              setPriority(ticket.Priority);
              setStatus(ticket.Status);
            }}
          >
            <i className="fa-sharp fa-solid fa-edit"></i>
          </button>
            </div>
          ))}
        </div>


        <div className="col-xs-3  ticket-section">  
        <div className="headings"> <h3>Finished</h3></div>
          {finishedTickets.map((ticket, index) => (
          <div key={index} className={`ticket ${ticket.Priority === "Critical" ? "critical" : ticket.Priority === "High" ? "high" : ticket.Priority === "Medium" ? "medium" : "low"}`}>
              <button className="delete-ticket" onClick={() => deletePost(ticket._id)}>
              <i class="fa-sharp fa-solid fa-trash"></i>
              </button>
              <p>{ticket.Description}</p>
              <p>
                Assigned To: <span>{ticket.Developer}</span>
              </p>
              <p>
                Priority: <span>{ticket.Priority}</span>
              </p>
              <p>
              Date Created: <span>{ticket.Date}</span>
            </p>
              <button
            className="edit-ticket"
            onClick={() => {
              openModal();
              setTicketID(ticket._id); // change to ticket._id
              setDescription(ticket.Description); // set the ticket values to the state values 
              setDeveloper(ticket.Developer);
              setPriority(ticket.Priority);
              setStatus(ticket.Status);
            }}
          >
            <i className="fa-sharp fa-solid fa-edit"></i>
          </button>
            </div>
          ))}
        </div>

       
  </div>
  </div>
  </div>
  <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="Edit Ticket"
      className="Modal"
      style={{
        position: 'fixed',
        top: modalPosition.top + modalPosition.height / 2,
        left: modalPosition.left + modalPosition.width / 2,
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
    >
      <div className="Edit-ticket">
      <h4>Edit Ticket</h4>
      </div>

      <form className="addForm" onSubmit={e => { e.preventDefault(); saveEdit(ticketID) }}>
      <label>
        Description
        <input
          id="description"
          name="description"
          type="text"
          placeholder="Description of Ticket..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          autoComplete="off"
        />
      </label>
      <label>
        Assign To
        <select
          id="developers"
          name="developer"
          value={developer}
          onChange={(e) => setDeveloper(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose a developer
          </option>
          {developersList.map((developer, index) => (
            <option key={index} value={developer}>
              {developer}
            </option>
          ))}
        </select>
      </label>
      <label>
        Priority
        <select
          name="priority"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose a priority
          </option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </label>
      <label>
        Status
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose a status
          </option>
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="In review">In review</option>
          <option value="Finished">Finished</option>
        </select>
      </label>
      <button type="submit" className="btn btn-primary">Save</button>
      <button onClick={closeModal} className="btn btn-danger">Cancel</button>
    </form>
  </Modal>
  </>
    );
  }
export default CurrentTicket;