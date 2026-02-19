const AlertCard = ({ alert }) => {
  const driverName = `${alert.driver.firstName} ${alert.driver.lastName}`;
  const location = alert.details.location;

  const formatTime = (timestamp) => new Date(timestamp).toLocaleString();

  const severityClass =
    alert.details.severityDescription === "CRITICAL" ? "critical" : "medium";

  return (
    <div className="card">
      <h3>{alert.details.typeDescription}</h3>

      <span className={`badge ${severityClass}`}>
        {alert.details.severityDescription}
      </span>

      <p>
        <strong>Driver:</strong> {driverName}
      </p>
      <p>
        <strong>Vehicle:</strong> {alert.vehicle.vehicleNumber}
      </p>
      <p>
        <strong>Category:</strong> {alert.details.categoryDescription}
      </p>
      <p>
        <strong>Status:</strong> {alert.status}
      </p>

      <p>
        <strong>Location:</strong> {location.city}, {location.state}
      </p>

      <p>
        <strong>Time:</strong> {formatTime(alert.timestamp)}
      </p>

      <hr />

      <p>Weather: {alert.details.weatherPrediction}</p>
      <p>Max G: {alert.details.maxGForce}</p>
      <p>Speed: {alert.details.maxVehicleSpeed} km/h</p>
    </div>
  );
};

export default AlertCard;
