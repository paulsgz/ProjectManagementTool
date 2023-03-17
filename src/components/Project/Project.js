import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Project.css";

function AddProject() {
  const [project, setProject] = useState("");

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
        } catch (err) {
          toast.error("Error creating project");
        }
      }
  };
  

  return (
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
        <button type="submit" className="create">Create</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddProject;