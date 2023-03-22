import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Project.css";

function AddProject() {
  const [project, setProject] = useState("");
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response2 = await axios.get("http://localhost:5000/projects");
        setProjectsList(response2.data.map((project) => project));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [projectsList]);

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
          await axios.post("http://localhost:5000/createProject", json);
          toast.success("Project created successfully");
          setProject("");
          const response = await axios.get("http://localhost:5000/projects");
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
        await axios.delete(`http://localhost:5000/projects/${id}`);
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