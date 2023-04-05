import React, { useState, useEffect } from 'react'; // Importing React and React hooks
import moment from 'moment'; // Importing moment library for working with dates and times
import welcome from '../../images/code.png'; // Importing the welcome image
import axios from "axios"; // Importing axios library for making HTTP requests
import { BsCardChecklist} from "react-icons/bs"; // Importing icons from react-icons package
import { GiProgression } from "react-icons/gi"
import { SiCodereview } from "react-icons/si"
import { IoCloudDone } from "react-icons/io5"
import { FaUserCog } from "react-icons/fa"
import ProgressBar from "react-progressbar"; // Importing ProgressBar component from react-progressbar package

import "./Dashboard.css"; // Importing styles for the Dashboard component

const url = "https://pmtserver.onrender.com"; // Setting the URL for the API server

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(moment()); // Initializing state for the current time
  const [developersList, setDevelopersList] = useState([]); // Initializing state for the list of developers
  const [data, setData] = useState([]); // Initializing state for the data fetched from the API server
  const [projectsList, setProjectsList] = useState([]); // Initializing state for the list of projects

  useEffect(() => { // Effect hook to fetch data from the API server
    async function fetchData() {
      try {
        const response = await axios(url); // Making a GET request to the API server using axios library
        setData(response.data); // Updating the state of data variable with the response data
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => { // Effect hook to fetch data about developers and projects
    async function fetchDevelopers() {
      try {
        const response = await axios.get("https://pmtserver.onrender.com/accounts"); // Making a GET request to the API server to fetch developers
        const response2 = await axios.get("https://pmtserver.onrender.com/projects"); // Making a GET request to the API server to fetch projects
        setDevelopersList(response.data.map((developer) => developer.Name)); // Updating the state of developersList variable with the list of developers extracted from the response data
        setProjectsList(response2.data.map((project) => project.Name)); // Updating the state of projectsList variable with the list of projects extracted from the response data
      } catch (error) {
        console.error(error);
      }
    }
    fetchDevelopers();
  }, []);

  useEffect(() => { // Effect hook to update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(moment()); // Updating the state of the currentTime variable with the current time
    }, 1000);

    return () => clearInterval(interval); // Cleaning up the interval when the component unmounts
  }, []);


  const projectProgress = {}; // Initializing an empty object to store project progress data

  // Looping through each ticket in the filtered data
  data.forEach((ticket) => {
    const projectName = ticket.Project;
    
    // If the project does not exist in the progress object, add it
    if (!projectProgress[projectName]) {
      projectProgress[projectName] = {
        totalTickets: 0,
        finishedTickets: 0,
        progress: 0
      };
    }
    
    // Update the total and finished tickets for the project
    projectProgress[projectName].totalTickets++;
    if (ticket.Status === "Finished") {
      projectProgress[projectName].finishedTickets++;
    }
  });

  for (const project in projectProgress) {
    const totalTickets = projectProgress[project].totalTickets;
    const finishedTickets = projectProgress[project].finishedTickets;
    projectProgress[project].progress = Math.round((finishedTickets / totalTickets) * 100);
  }


  return (
<div className="container-fluid2">
  <div className="color">
    <h2 className="dashboard-title">Dashboard</h2>
    <div className="time-date">
      // Display the current date and time using Moment.js library
      {currentTime.format('MMMM Do YYYY, h:mm:ss a')}
    </div>
  </div>

  <div className="row row1">
    <div className='col-md-4'>
      <div className="card card-welcome">
        <div className="card-body">
          <h5 className="card-title">Welcome to PMT Pro</h5>
          <p className="card-text">PMT Pro is a powerful project management tool designed to help you and your team stay organized and on track.</p>
          <img src={welcome} width="500" height="500" alt="Welcome" />
        </div>
      </div>
    </div>
    <div className='col-md-4'>
      <div className="card card-welcome">
        <div className="card-body">
          <h5 className="card-title">Recent Tickets</h5>
          <p className="card-text">Keep track of your team's support requests and stay up to date with the latest issues.</p>
          <ul className="recent-tickets">
            // Display the most recent 5 tickets in descending order by date using Moment.js library
            {data
              .sort((a, b) => moment(b.Date).diff(moment(a.Date)))
              .slice(0, 5)
              .map((ticket, index) => (
                <li key={index} className="tickets">
                  <span className="bullet"></span>
                  <div className="ticket-details">
                    <p className="ticket-description">{ticket.Description}</p>
                    <p className="ticket-date">{ticket.Date}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
    <div className='col-md-4'>
      <div className="card card-welcome">
        <div className="card-body">
          <h5 className="card-title">Progress Tracker</h5>
          <p className="card-text">Easily track your project's progress with our intuitive progress tracker.</p>
          <div>
            // Display the progress for each project in the projectProgress object
            {Object.entries(projectProgress).map(([projectName, progressData]) => (
              <div key={projectName}>
                <p className='title'>{projectName}</p>
                <ProgressBar
                  completed={progressData.progress}
                  bgcolor="#6EA8FF"
                  labelAlignment="center"
                  height="13px"
                  style={{ borderRadius: "5px" }}
                />
                <p>
                  {progressData.finishedTickets} out of {progressData.totalTickets} tickets finished
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="row row2">
  {/* To-Do column */}
  <div className='col-sm-3' >
    <div className="card card-welcome To-Do">
      <div className="card-body">
        <h5 className="card-title ">To Do <BsCardChecklist style={{ marginBottom:'4px', marginRight:'4px' }} /></h5>
        <p className="card-text">Manage your team's tasks and stay on top of your project's to-do list.</p>
      </div>
    </div>
  </div>
  {/* In Progress column */}
  <div className='col-sm-3'>
    <div className="card card-welcome Progress">
      <div className="card-body">
        <h5 className="card-title ">In Progress<GiProgression style={{ marginBottom:'4px', marginLeft:'4px' }}/></h5>
        <p className="card-text">Focus on current tasks and keep your team on track.</p>
      </div>
    </div>
  </div>
  {/* In Review column */}
  <div className='col-sm-3'>
    <div className="card card-welcome Review">
      <div className="card-body">
        <h5 className="card-title">In Review <SiCodereview style={{ marginBottom:'4px', marginRight:'4px' }}/></h5>
        <p className="card-text">Get feedback on completed tasks and make sure everything is up to standard.</p>
      </div>
    </div>
  </div>
  {/* Finished column */}
  <div className='col-sm-3'>
    <div className="card card-welcome Finished">
      <div className="card-body">
        <h5 className="card-title">Finished <IoCloudDone style={{ marginBottom:'4px', marginRight:'4px' }}/></h5>
        <p className="card-text">Celebrate your team's accomplishments and mark completed tasks as finished.</p>
      </div>
    </div>
  </div>
</div>
{/* Developers list */}
<div className="row row3">
  <div className="col-sm-12">
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Developers</h4>
        <ul className="developer-list">
          {/* Map through developersList array and create a list item for each developer */}
          {developersList.map((developer, index) => (
            <li key={index} className="developer-item"><FaUserCog style={{ marginBottom:'4px', marginRight:'4px' }}/>{developer}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default Dashboard;
