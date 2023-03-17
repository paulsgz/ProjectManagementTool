import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AddTicket.css";

function AddTicket({ onTicketCreated }) {
  const [description, setDescription] = useState("");
  const [developer, setDeveloper] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [developersList, setDevelopersList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [project, setProject] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/accounts");
        const response2 = await axios.get("http://localhost:5000/projects");
        setDevelopersList(response.data.map((developer) => developer.Name));
        setProjectsList(response2.data.map((project) => project.Name));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);


  
  const sendData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append("description", description);
    formData.append("developer", developer);
    formData.append("priority", priority);
    formData.append("status", status);
    formData.append("date",date);
    formData.append("project",project);
    const entries = formData.entries();
    const json = Object.fromEntries(Array.from(entries));
    console.log(json);
  
   
      const shouldSend = window.confirm("Are you sure you want to create this ticket?");
      if (shouldSend) {
        try {
          await axios.post("http://localhost:5000/create", json);
          toast.success("Ticket created successfully");
          setDescription("");
          setDeveloper("");
          setPriority("");
          setStatus("");
          setProject("");
          setDate(new Date().toISOString().slice(0, 10));
          onTicketCreated();
        } catch (err) {
          toast.error("Error creating ticket");
        }
      }
  };
  

  return (
    <div className="add-ticket">
      <form className="addForm" onSubmit={sendData}>
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
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Finished">Finished</option>
          </select>
        </label>
        <label>
          Project
          <select
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

        <button type="submit" className="create">Create</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddTicket;