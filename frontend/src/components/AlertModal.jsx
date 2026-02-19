const AlertModal = ({ alert, onClose }) => {
  if (!alert) return null;

  const driverName = `${alert.driver.firstName} ${alert.driver.lastName}`;
  const location = alert.details.location;

  const formatTime = (timestamp) => new Date(timestamp).toLocaleString();

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* HEADER */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ margin: 0 }}>{alert.details.typeDescription}</h2>
          <p style={{ margin: "6px 0", color: "#666" }}>
            {alert.details.categoryDescription}
          </p>
        </div>

        {/* INFO GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px 24px",
            fontSize: "14px",
          }}
        >
          <Detail label="Driver" value={driverName} />
          <Detail label="Vehicle" value={alert.vehicle.vehicleNumber} />
          <Detail label="Severity" value={alert.details.severityDescription} />
          <Detail label="Status" value={alert.status} />
          <Detail
            label="Location"
            value={`${location.city}, ${location.state}`}
          />
          <Detail label="Weather" value={alert.details.weatherPrediction} />
          <Detail label="Max G" value={alert.details.maxGForce} />
          <Detail
            label="Speed"
            value={`${alert.details.maxVehicleSpeed} km/h`}
          />
          <Detail label="Time" value={formatTime(alert.timestamp)} />
        </div>

        {/* BUTTON */}
        <div style={{ marginTop: "25px", textAlign: "right" }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              border: "none",
              background: "#1f2937",
              color: "white",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <span style={{ fontWeight: 600 }}>{label}:</span>{" "}
    <span style={{ color: "#444" }}>{value}</span>
  </div>
);

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#ffffff",
  padding: "28px 30px",
  borderRadius: "16px",
  width: "500px",
  maxWidth: "90%",
  maxHeight: "85vh",
  overflowY: "auto",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
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
