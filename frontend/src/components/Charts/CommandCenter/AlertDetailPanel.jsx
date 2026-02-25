function AlertDetailPanel({ alert, onClose }) {
  if (!alert) return null;

  return (
    <div className="alert-detail-panel">
      <div className="panel-header">
        <h3>⚠ Alert Details</h3>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="panel-content">
        <p><strong>Vehicle:</strong> {alert.vehicle?.vehicleNumber}</p>
        <p>
          <strong>Driver:</strong>{" "}
          {alert.driver?.firstName} {alert.driver?.lastName}
        </p>
        <p><strong>Type:</strong> {alert.details?.typeDescription}</p>
        <p><strong>Severity:</strong> {alert.details?.severityDescription}</p>
        <p><strong>Speed:</strong> {alert.details?.maxVehicleSpeed} km/h</p>
        <p><strong>Max G-Force:</strong> {alert.details?.maxGForce}</p>
        <p><strong>Duration:</strong> {alert.duration}s</p>
        <p><strong>City:</strong> {alert.details?.location?.city}</p>
        <p>
          <strong>Time:</strong>{" "}
          {new Date(alert.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default AlertDetailPanel;