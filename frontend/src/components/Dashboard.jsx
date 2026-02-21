import MapView from "./MapView";

function Dashboard({ alerts }) {
  const total = alerts.length;
  console.log(alerts);

  const highSeverity = alerts.filter((a) => a.details?.severity === 3).length;

  const mediumSeverity = alerts.filter((a) => a.details?.severity === 2).length;

  const lowSeverity = alerts.filter((a) => a.details?.severity <= 1).length;

  return (
    <>
      <div className="dashboard-stats">

        <div className="dashboard-cards">
          <div className="stat-card total">
            <h4>Total Alerts</h4>
            <p>{total}</p>
          </div>

          <div className="stat-card high">
            <h4>High Severity</h4>
            <p>{highSeverity}</p>
          </div>

          <div className="stat-card medium">
            <h4>Moderate Severity</h4>
            <p>{mediumSeverity}</p>
          </div>

          <div className="stat-card low">
            <h4>Low Severity</h4>
            <p>{lowSeverity}</p>
          </div>
        </div>
      </div>
      <h2>Fleets on Map</h2>
      <MapView alerts={alerts} />

    </>
  );
}

export default Dashboard;
