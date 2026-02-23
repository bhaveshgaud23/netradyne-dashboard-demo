const AlertCard = ({ alert, onClick, isNew, isUnread }) => {
  if (!alert) return null;

  const driverName = alert?.driver
    ? `${alert.driver.firstName} ${alert.driver.lastName}`
    : "Unknown Driver";

  // 🔹 KEEP OLD date format functions
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

  // 🔥 UPDATED severity logic (supports numeric severity also)
  const getSeverityClass = (severity, numericSeverity) => {
    if (severity) {
      switch (severity.toUpperCase()) {
        case "CRITICAL":
          return "critical";
        case "WARN":
        case "MODERATE":
          return "warn";
        default:
          return "info";
      }
    }

    // NEW: numeric fallback
    if (numericSeverity === 3) return "critical";
    if (numericSeverity === 2) return "warn";
    return "info";
  };

  const severityClass = getSeverityClass(
    alert?.details?.severityDescription,
    alert?.details?.severity,
  );

  return (
    <div
      className={`card ${severityClass}-border two-column
        ${isNew ? "new-alert-card" : ""}
        ${isUnread ? "unread-card" : ""}
      `}
      onClick={() => onClick(alert)}
    >
      {/* 🔴 NEW: Unread indicator dot */}
      {isUnread && <span className="unread-dot" />}

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
