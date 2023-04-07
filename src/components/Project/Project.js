/**
This component is responsible for rendering a form to add new projects to a project management application.
It uses React hooks to manage the state of the form inputs and fetches project data from a remote server using Axios.
It also displays a notification message using the react-toastify library to inform users about the result of their actions.
*/
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Project.css";

function AddProject() {
// State variables to manage the form inputs and the list of projects
const [project, setProject] = useState("");
const [projectsList, setProjectsList] = useState([]);

// Fetches the list of projects from the server and updates the state variable when projectsList changes
useEffect(() => {
async function fetchData() {
try {
const response2 = await axios.get("https://pmtserver.onrender.com/projects");
setProjectsList(response2.data.map((project) => project));
} catch (error) {
console.error(error);
}
}
fetchData();
}, [projectsList]);

// Sends a POST request to create a new project when the form is submitted
const sendData = async (e) => {
e.preventDefault();
const formData = new FormData();
  
    formData.append("project",project);
    const entries = formData.entries();
    const json = Object.fromEntries(Array.from(entries));
    console.log(json);
  
      const shouldSend = window.confirm("Are you sure you want to create new project?");
      if (shouldSend) {
        try {
          await axios.post("https://pmtserver.onrender.com/createProject", json);
          toast.success("Project created successfully");
          setProject("");
          const response = await axios.get("https://pmtserver.onrender.com/projects");
          setProjectsList(response.data);
        } catch (err) {
          toast.error("Error creating project");
        }
      }
  };
  
  const deleteProject = async (id) => {
    console.log(id);
    const shouldDelete = window.confirm("Are you sure you want to delete this project?");
    if (shouldDelete) {
      try {
        await axios.delete(`https://pmtserver.onrender.com/projects/${id}`);
        setProjectsList((prevData) => prevData.filter((project) => project._id !== id));
        alert("Ticket deleted successfully!");
      } catch (error) {
        console.log(error);
        alert("An error occurred while deleting the ticket.");
      }
    }
  };

  return (
<div className="container projectCon">
  <div className="row projectRow">
    <div className="col-xl-12 projectForm ">
      <div className="add-project">
        <form className="addForm" onSubmit={sendData}>
          <label>
            Project Name
            <input
              id="project"
              name="project"
              type="text"
              placeholder="Name of project..."
              value={project}
              onChange={(e) => setProject(e.target.value)}
              required
              autoComplete="off"
            />
          </label>
          <button type="submit" className="btn btn-primary create">
            Create
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
    <div className="col-xl-12 projectList">
      <div className="project-cards">
        {projectsList.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.Name}</h3>
            <button className="btn btn-danger" onClick={()=>deleteProject(project._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  
  );
}

export default AddProject;