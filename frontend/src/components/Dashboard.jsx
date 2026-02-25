import { useState } from "react";
import ImpactDirectionChart from "./Charts/Maintenance/ImpactDirectionChart";
import VehicleStressScore from "./Charts/Maintenance/VehicleStressScore";
import DriverRiskLeaderboard from "./Charts/OHS/DriverRiskLeaderboard";
import CriticalAlertsByDriver from "./Charts/OHS/CriticalAlertsByDriver";
import DriverMonitoringDashboard from "./Charts/OHS/DriverMonitoringDashboard";
import SpeedDistributionHistogram from "./Charts/OHS/SpeedDistributionHistogram";
import DurationVsSeverity from "./Charts/OHS/DurationVsSeverity";
import LiveAlertStream from "./Charts/CommandCenter/LiveAlertStream";
import SeverityMap from "./Charts/CommandCenter/SeverityMap";
import AlertStatusBreakdown from "./Charts/CommandCenter/AlertStatusBreakdown";
import AlertTypeRealTimePie from "./Charts/CommandCenter/AlertTypeRealTimePie";
import AlertDetailPanel from "./Charts/CommandCenter/AlertDetailPanel";

import MapView from "./MapView";
import SeverityBarChart from "./SeverityBarChart";
import SpeedLineChart from "./SpeedLineChart";
// import TopHeader from "./TopHeader";
import RiskOverviewKPI from "./Charts/Authority/RiskOverviewKPI";
import AlertsByCategoryStacked from "./Charts/Authority/AlertsByCategoryStacked";
import CityRiskRanking from "./Charts/Authority/CityRiskRanking";
import CriticalAlertsTrend from "./Charts/Authority/CriticalAlertsTrend";
import GeoHeatmap from "./Charts/Authority/GeoHeatmap";
import WeatherImpactAnalysis from "./Charts/Authority/WeatherImpactAnalysis";
import HighGForceScatter from "./Charts/Maintenance/HighGForceScatter";
import VehiclesHighGEvents from "./Charts/Maintenance/VehiclesHighGEvents";


import { FaBell } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";


function Dashboard({ alerts }) {
  const total = alerts.length;
  console.log(alerts);

  const highSeverity = alerts.filter((a) => a.details?.severity === 3).length;

  const mediumSeverity = alerts.filter((a) => a.details?.severity === 2).length;

  const lowSeverity = alerts.filter((a) => a.details?.severity <= 1).length;
  
  const [selectedAlert, setSelectedAlert] = useState(null);

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
        <RiskOverviewKPI alerts={alerts} />
        <AlertsByCategoryStacked alerts={alerts} />
        <CityRiskRanking alerts={alerts} />
        <CriticalAlertsTrend alerts={alerts} />
        <GeoHeatmap alerts={alerts} />
        <WeatherImpactAnalysis alerts={alerts} />
        <HighGForceScatter alerts={alerts} />
        <VehiclesHighGEvents alerts={alerts} />
        <ImpactDirectionChart alerts={alerts} />
        <VehicleStressScore alerts={alerts} />
        <DriverRiskLeaderboard alerts={alerts} />
        <CriticalAlertsByDriver alerts={alerts} />
        <DriverMonitoringDashboard alerts={alerts} />
        <SpeedDistributionHistogram alerts={alerts} />
        <DurationVsSeverity alerts={alerts} />
        <LiveAlertStream alerts={alerts} />
        <SeverityMap alerts={alerts} onSelectAlert={setSelectedAlert} />
        <AlertStatusBreakdown alerts={alerts} />
        <AlertTypeRealTimePie alerts={alerts} />
        <AlertDetailPanel
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      </div>
      <h2>Fleets on Map</h2>
      <MapView alerts={alerts} />
    </>
  );
}

export default Dashboard;
