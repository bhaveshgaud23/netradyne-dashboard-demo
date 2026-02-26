import React from "react";

import RiskOverviewKPI from "./Charts/Authority/RiskOverviewKPI";
import AlertsByCategoryStacked from "./Charts/Authority/AlertsByCategoryStacked";
import CityRiskRanking from "./Charts/Authority/CityRiskRanking";
import CriticalAlertsTrend from "./Charts/Authority/CriticalAlertsTrend";
import GeoHeatmap from "./Charts/Authority/GeoHeatmap";
import WeatherImpactAnalysis from "./Charts/Authority/WeatherImpactAnalysis";

import HighGForceScatter from "./Charts/Maintenance/HighGForceScatter";
import VehiclesHighGEvents from "./Charts/Maintenance/VehiclesHighGEvents";
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

const RoleBasedCharts = ({ role, alerts, selectedAlert, setSelectedAlert }) => {
  switch (role) {
    case "AUTHORITY":
      return (
        <>
        
          <RiskOverviewKPI alerts={alerts} />
          
        
          <AlertsByCategoryStacked alerts={alerts} />
        
        
          <CityRiskRanking alerts={alerts} />
        
        
          <CriticalAlertsTrend alerts={alerts} />
        
        
          <GeoHeatmap alerts={alerts} />
          
        
          <WeatherImpactAnalysis alerts={alerts} />
        
        
        </>
      );

    case "MAINTENENCE":
      return (
        <>
          <HighGForceScatter alerts={alerts} />
          <VehiclesHighGEvents alerts={alerts} />
          <ImpactDirectionChart alerts={alerts} />
          <VehicleStressScore alerts={alerts} />
        </>
      );

    case "QRT":
      return (
        <>
          <DriverRiskLeaderboard alerts={alerts} />
          <CriticalAlertsByDriver alerts={alerts} />
          <DriverMonitoringDashboard alerts={alerts} />
          <SpeedDistributionHistogram alerts={alerts} />
          <DurationVsSeverity alerts={alerts} />
        </>
      );

    case "COMMANDCENTER":
      return (
        <>
          <LiveAlertStream alerts={alerts} />
          <SeverityMap alerts={alerts} onSelectAlert={setSelectedAlert} />
          <AlertStatusBreakdown alerts={alerts} />
          <AlertTypeRealTimePie alerts={alerts} />
          <AlertDetailPanel
            alert={selectedAlert}
            onClose={() => setSelectedAlert(null)}
          />
        </>
      );

    default:
      return null;
  }
};

export default RoleBasedCharts;