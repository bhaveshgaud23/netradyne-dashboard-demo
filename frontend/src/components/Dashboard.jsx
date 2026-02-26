import { useState } from "react";


import MapView from "./MapView";
import SeverityBarChart from "./SeverityBarChart";
import SpeedLineChart from "./SpeedLineChart";
// import TopHeader from "./TopHeader";

import RoleBasedCharts from "./RoleBasedCharts";


import { FaBell } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";


function Dashboard({ alerts }) {
  const total = alerts.length;
  // console.log(alerts);

  const highSeverity = alerts.filter((a) => a.details?.severity === 3).length;

  const mediumSeverity = alerts.filter((a) => a.details?.severity === 2).length;

  const lowSeverity = alerts.filter((a) => a.details?.severity <= 1).length;
  
  const role = localStorage.getItem("role");
  const [selectedAlert, setSelectedAlert] = useState(null);

  console.log(localStorage.getItem("role"));


  return (
    <>



<div className="dashboard-wrapper">
  <div className="dashboard-stats">
    <div className="dashboard-cards">

      <div className="stat-card total">
        <div className="card-header">
          <FaBell className="card-icon" />
          <h4>Total Alerts</h4>
        </div>
        <p>{total}</p>
      </div>

      <div className="stat-card high">
        <div className="card-header">
          <MdError className="card-icon" />
          <h4>High Severity</h4>
        </div>
        <p>{highSeverity}</p>
      </div>

      <div className="stat-card medium">
        <div className="card-header">
          <FaExclamationTriangle className="card-icon" />
          <h4>Moderate Severity</h4>
        </div>
        <p>{mediumSeverity}</p>
      </div>

      <div className="stat-card low">
        <div className="card-header">
          <FaCheckCircle className="card-icon" />
          <h4>Low Severity</h4>
        </div>
        <p>{lowSeverity}</p>
      </div>

    </div>
  </div>
</div>

        {/* Charts Section */}
        {/* Charts Section */}
        <div className="charts-container">
        <SeverityBarChart alerts={alerts} />
         <SpeedLineChart alerts={alerts} />
  <RoleBasedCharts
    role={role}
    alerts={alerts}
    selectedAlert={selectedAlert}
    setSelectedAlert={setSelectedAlert}
  />
</div>
      <div className="dashboard-wrapper">
      <h2>Fleets on Map</h2>
      <MapView alerts={alerts} />
      </div>
    </>
  );
}

export default Dashboard;
