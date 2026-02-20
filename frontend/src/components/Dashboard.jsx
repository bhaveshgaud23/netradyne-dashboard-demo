import React from "react";
import "./Dashboard.css";

function Dashboard({ alerts }) {
  const totalAlerts = alerts.length;

  const severityCounts = {
    CRITICAL: 0,
    MODERATE: 0,
    WARN: 0,
    INFO: 0,
  };

  alerts.forEach((alert) => {
    const sev = alert.details?.severityDescription;
    if (severityCounts[sev] !== undefined) {
      severityCounts[sev]++;
    }
  });

  return (
    <div className="dashboard-metrics">
      <div className="metric-box total">
        <h3>Total Alerts</h3>
        <p>{totalAlerts}</p>
      </div>

      <div className="metric-box critical">
        <h3>Critical</h3>
        <p>{severityCounts.CRITICAL}</p>
      </div>

      <div className="metric-box moderate">
        <h3>Moderate</h3>
        <p>{severityCounts.MODERATE}</p>
      </div>

      <div className="metric-box warn">
        <h3>Warn</h3>
        <p>{severityCounts.WARN}</p>
      </div>

      <div className="metric-box info">
        <h3>Info</h3>
        <p>{severityCounts.INFO}</p>
      </div>
    </div>
  );
}

export default Dashboard;
