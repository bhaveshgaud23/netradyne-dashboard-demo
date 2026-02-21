const AlertCard = ({ alert, onClick, isNew }) => {
  if (!alert) return null;

  const driverName = alert?.driver
    ? `${alert.driver.firstName} ${alert.driver.lastName}`
    : "Unknown Driver";

  const formatDate = (timestamp) => {
    if (!timestamp) return "--";
    return new Date(timestamp).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "--";
    return new Date(timestamp).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

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
      className={`card ${severityClass}-border two-column ${isNew ? "new-alert-card" : ""
        }`}
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
        <div className="date-time">
          <span className="date">{formatDate(alert.timestamp)}</span>
          <span className="time">{formatTime(alert.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;