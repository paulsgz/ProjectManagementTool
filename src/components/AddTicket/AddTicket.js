import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import "./AddTicket.css";

function AddTicket({ onTicketCreated }) {
  // Declare state variables for form inputs
  const [description, setDescription] = useState("");
  const [developer, setDeveloper] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [developersList, setDevelopersList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [project, setProject] = useState("");

  // Fetch developers and projects list on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Make API requests to get list of developers and projects
        const response = await axios.get("https://pmtserver.onrender.com/accounts");
        const response2 = await axios.get("https://pmtserver.onrender.com/projects");
        
        // Update state variables with list of developers and projects
        setDevelopersList(response.data.map((developer) => developer.Name));
        setProjectsList(response2.data.map((project) => project.Name));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // Send form data to server on form submission
  const sendData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append("description", description);
    formData.append("developer", developer);
    formData.append("priority", priority);
    formData.append("status", status);
    formData.append("date",date);
    formData.append("project",project);
    
    // Convert FormData object to JSON object
    const entries = formData.entries();
    const json = Object.fromEntries(Array.from(entries));
  
    // Display confirmation dialog before submitting form data to server
    const shouldSend = window.confirm("Are you sure you want to create this ticket?");
    if (shouldSend) {
      try {
        // Make API request to create new ticket on server
        await axios.post("https://pmtserver.onrender.com/create", json);
        alert("Ticket created successfully");
        
        // Reset form inputs and reload page
        setDescription("");
        setDeveloper("");
        setPriority("");
        setStatus("");
        setProject("");
        setDate(new Date().toISOString().slice(0, 10));
        onTicketCreated();
        window.location.reload();
      } catch (err) {
        alert("Error creating ticket");
      }
    }
  };
  
  

  return (
    <div className="add-ticket">
      <form className="addForm2" onSubmit={sendData}>
        <div className="form-group">
        <label >
          Description
          <input
            className="form-control form-control-lg"
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
        </div>
        <div className="form-group">
        <label>
          Assign To
          <select
            className="form-control form-control-lg"
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
        </div>
        <div className="form-group">
        <label>
          Priority
          <select
            className="form-control form-control-lg"
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
        </div>
        <div className="form-group">
        <label>
          Status
          <select
            className="form-control form-control-lg"
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
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Finished">Finished</option>
          </select>
        </label>
        </div>
        <div className="form-group">
        <label>
          Project
          <select
            className="form-control form-control-lg"
            id="projects"
            name="project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose a project
            </option>
            {projectsList.map((project, index) => (
              <option key={index} value={project}>
                {project}
              </option>
            ))}
          </select>
        </label>
         </div>
        <button type="submit" className="btn btn-primary create">Create</button>
      </form>
    </div>
  );
}

export default AddTicket;