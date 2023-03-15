import React, { useState, useEffect } from "react";
import "./CurrentTicket.css";
import axios from "axios";
import Modal from 'react-modal';

const url = "http://localhost:5000/";

function CurrentTicket() {
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [developer, setDeveloper] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [developersList, setDevelopersList] = useState([]);
  const [ticketID, setTicketID] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchDevelopers() {
      try {
        const response = await axios.get("http://localhost:5000/accounts");
        setDevelopersList(response.data.map((developer) => developer.Name));
      } catch (error) {
        console.error(error);
      }
    }
    fetchDevelopers();
  }, []);

  const deletePost = async (id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (shouldDelete) {
      try {
        await axios.delete(`http://localhost:5000/${id}`);
        setData((prevData) => prevData.filter((ticket) => ticket._id !== id));
        alert("Ticket deleted successfully!");
      } catch (error) {
        console.log(error);
        alert("An error occurred while deleting the ticket.");
      }
    }
  };

  const openModal = (id) => {
    setTicketID(id);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const saveEdit = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/${id}`, {
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


  // Filter the tickets based on their status
// Sort the data array based on the priority key



  const toggleSortOrder = () => {
    if (sortOrder === "ascending") {
      setSortOrder("descending");
    } else {
      setSortOrder("ascending");
    }
  };


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


// Filter the tickets based on their status
const todoTickets = sortedData.filter(ticket => ticket.Status === 'To do');
const inProgressTickets = sortedData.filter(ticket => ticket.Status === 'In progress');
const inReviewTickets = sortedData.filter(ticket => ticket.Status === 'In review');
const finishedTickets = sortedData.filter(ticket => ticket.Status === 'Finished');


  return (
    <div className="current-ticket">
    <div>
      <button onClick={toggleSortOrder}>
        {sortOrder === "ascending" ? "Change Sort" : "Change Sort"}
      </button>
    </div>

      <div className="ticket-section">
        <h3>To Do</h3>
        {todoTickets.map((ticket, index) => (
          <div key={index} className="individual-ticket">
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


        <div className="ticket-section">
          <h3>In Progress</h3>
          {inProgressTickets.map((ticket, index) => (
            <div key={index} className="individual-ticket">
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


        <div className="ticket-section">
          <h3>In Review</h3>
          {inReviewTickets.map((ticket, index) => (
            <div key={index} className="individual-ticket">
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


        <div className="ticket-section">  
          <h3>Finished</h3>
          {finishedTickets.map((ticket, index) => (
            <div key={index} className="individual-ticket">
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

        <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="Edit Ticket"
      className="Modal"
    >
      <h4>Edit Ticket</h4>
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
      <button type="submit">Save</button>
      <button onClick={closeModal}>Cancel</button>
    </form>
  </Modal>


      </div>
    );
  }
export default CurrentTicket;