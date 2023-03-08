import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AddTicket.css";

function AddTicket() {
  const [description, setDescription] = useState("");
  const [developer, setDeveloper] = useState("");
  const [priority, setPriority] = useState("");

  const sendData = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("description", description);
    formData.append("developer", developer);
    formData.append("priority", priority);

    const entries = formData.entries();
    const json = Object.fromEntries(Array.from(entries));
    console.log(json);
    try {
      await axios.post("http://localhost:5000/create", json);
      toast.success("Ticket created successfully");
      setDescription("");
      setDeveloper("");
      setPriority("");
    } catch (err) {
      toast.error("Error creating ticket");
    }

  };

  return (
    <div className="add-ticket">
      <form onSubmit={sendData}>
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
            <option value="Paul">Paul</option>
            <option value="Lance">Lance</option>
            <option value="Kim">Kim</option>
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
        <button type="submit" className="create">Create</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddTicket;