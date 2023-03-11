import React, { useState, useEffect } from "react";
import "./CurrentTicket.css";
import axios from "axios";

const url = "http://localhost:5000/";

function CurrentTicket() {
  const [addTicket, setAddTicket] = useState(true);
  const [data, setData] = useState([]);

  const fetch = async () => {
    try {
      const response = await axios(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

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
  
  useEffect(() => {
    fetch();
  }, []);
  
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="current-ticket">
      {data.map((ticket, index) => (
        <div key={index} className="individual-ticket">
          <p className="close-ticket" onClick={() => deletePost(ticket._id)}>
            Close Ticket
          </p>
          <p>
            Assigned To: <span>{ticket.Developer}</span>
          </p>
          <p>
            Priority:  <span>{ticket.Priority}</span>
          </p>
          <p>
            Status:  <span>{ticket.Status}</span>
          </p>
          <p>Description: </p>
          <p>{ticket.Description}</p>
        </div>
      ))}
    </div>
  );
}

export default CurrentTicket;