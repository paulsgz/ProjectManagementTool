import React, { useState, useEffect } from 'react';
import moment from 'moment';
import welcome from '../../images/code.png';
import axios from "axios";
import { BsCardChecklist} from "react-icons/bs";
import { GiProgression } from "react-icons/gi"
import { SiCodereview } from "react-icons/si"
import { IoCloudDone } from "react-icons/io5"
import { FaUserCog } from "react-icons/fa"
import ProgressBar from "react-progressbar";

import "./Dashboard.css";

const url = "http://localhost:5000/";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [developersList, setDevelopersList] = useState([]);
  const [data, setData] = useState([]);
  const [projectsList, setProjectsList] = useState([]);

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
        const response2 = await axios.get("http://localhost:5000/projects");
        setDevelopersList(response.data.map((developer) => developer.Name));
        setProjectsList(response2.data.map((project) => project.Name));
      } catch (error) {
        console.error(error);
      }
    }
    fetchDevelopers();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const projectProgress = {};

  // Loop through each project in the filtered data
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
      {Object.entries(projectProgress).map(([projectName, progressData]) => (
        <div key={projectName}>
          <p className='title'>{projectName}</p>
          <ProgressBar
            completed={progressData.progress}
            bgColor="#6EA8FF"
            labelAlignment="center"
            height="13px"
            style={{ borderRadius: "5px" 

          }}
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
        <div className='col-sm-3' >
          <div className="card card-welcome To-Do">
            <div className="card-body">
              <h5 className="card-title ">To Do <BsCardChecklist style={{ marginBottom:'4px', marginRight:'4px' }} /></h5>
              <p className="card-text">Manage your team's tasks and stay on top of your project's to-do list.</p>
            </div>
          </div>
        </div>
        <div className='col-sm-3'>
          <div className="card card-welcome Progress">
            <div className="card-body">
              <h5 className="card-title ">In Progress<GiProgression style={{ marginBottom:'4px', marginLeft:'4px' }}/></h5>
              <p className="card-text">Focus on current tasks and keep your team on track.</p>
            </div>
          </div>
        </div>
        <div className='col-sm-3'>
          <div className="card card-welcome Review">
            <div className="card-body">
              <h5 className="card-title">In Review <SiCodereview style={{ marginBottom:'4px', marginRight:'4px' }}/></h5>
              <p className="card-text">Get feedback on completed tasks and make sure everything is up to standard.</p>
            </div>
          </div>
        </div>
        <div className='col-sm-3'>
          <div className="card card-welcome Finished">
            <div className="card-body">
              <h5 className="card-title">Finished <IoCloudDone style={{ marginBottom:'4px', marginRight:'4px' }}/></h5>
              <p className="card-text">Celebrate your team's accomplishments and mark completed tasks as finished.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row row3">
  <div className="col-sm-12">
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Developers</h4>
        <ul className="developer-list">
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
