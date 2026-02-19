const AlertCard = ({ alert, onClick }) => {
  if (!alert) return null;

  const driverName = alert?.driver
    ? `${alert.driver.firstName} ${alert.driver.lastName}`
    : "Unknown Driver";

  const formatTime = (timestamp) =>
    timestamp ? new Date(timestamp).toLocaleTimeString() : "--";

  const getSeverityClass = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "critical";
      case "WARN":
      case "MODERATE":
        return "warn";
      default:
        return "info";
    }
  };

  const severityClass = getSeverityClass(alert?.details?.severityDescription);

  return (
    <div
      className={`card ${severityClass}-border two-column`}
      onClick={() => onClick(alert)}
    >
      {/* LEFT SIDE */}
      <div className="left">
        <h4>{alert?.details?.typeDescription || "Alert"}</h4>

        <span className={`badge ${severityClass}`}>
          {alert?.details?.severityDescription || "INFO"}
        </span>

        <p className="category">
          {alert?.details?.categoryDescription || "General"}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        <p className="driver">{driverName}</p>
        <p className="time">{formatTime(alert.timestamp)}</p>
      </div>
    </div>
  );
};

export default AlertCard;
