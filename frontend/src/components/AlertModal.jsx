const AlertModal = ({ alert, onClose }) => {
  if (!alert) return null;

  const driverName = `${alert.driver.firstName} ${alert.driver.lastName}`;
  const location = alert.details.location;

  const formatTime = (timestamp) => new Date(timestamp).toLocaleString();

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>{alert.details.typeDescription}</h2>

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
          <strong>Severity:</strong> {alert.details.severityDescription}
        </p>
        <p>
          <strong>Status:</strong> {alert.status}
        </p>

        <hr />

        <p>
          <strong>Location:</strong> {location.city}, {location.state}
        </p>
        <p>
          <strong>Weather:</strong> {alert.details.weatherPrediction}
        </p>
        <p>
          <strong>Max G:</strong> {alert.details.maxGForce}
        </p>
        <p>
          <strong>Speed:</strong> {alert.details.maxVehicleSpeed} km/h
        </p>
        <p>
          <strong>Time:</strong> {formatTime(alert.timestamp)}
        </p>

        <button onClick={onClose} style={closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  width: "400px",
  maxHeight: "80vh",
  overflowY: "auto",
};

const closeBtn = {
  marginTop: "20px",
  padding: "8px 16px",
  border: "none",
  background: "#1f2937",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AlertModal;
