import {
  FaExclamationTriangle,
  FaCarCrash,
  FaUserShield,
  FaCarSide,
  FaCogs,
  FaStar,
} from "react-icons/fa";

const AlertCard = ({ alert, onClick, isNew, isUnread }) => {
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

  const getSeverityClass = (severity, numericSeverity) => {
    if (severity) {
      switch (severity.toUpperCase()) {
        case "ALERT":
          return "critical";
        case "WARN":
        case "MODERATE":
          return "warn";
        default:
          return "info";
      }
    }

    if (numericSeverity === 1) return "critical";
    if (numericSeverity === 2) return "warn";
    return "info";
  };

  const severityClass = getSeverityClass(
    alert?.details?.severityDescription,
    alert?.details?.severity
  );

  // 🔹 Icon selector based on category
  const getCategoryIcon = (category) => {
    switch (category?.toUpperCase()) {
      case "SAFETY ALERT":
        return <FaExclamationTriangle />;
      case "COLLISION ALERT":
        return <FaCarCrash />;
      case "DRIVER MONITORING":
        return <FaUserShield />;
      case "DRIVING BEHAVIOR":
        return <FaCarSide />;
      case "SYSTEM ALERT":
        return <FaCogs />;
      case "DRIVER PERFORMANCE":
        return <FaStar />;
      default:
        return <FaExclamationTriangle />;
    }
  };

  return (
    <div
      className={`card ${severityClass}-border two-column
        ${isNew ? "new-alert-card" : ""}
        ${isUnread ? "unread-card" : ""}
      `}
      onClick={() => onClick(alert)}
    >
      {isUnread && <span className="unread-dot" />}

      {/* LEFT SIDE */}
      <div className="left">
        {/* 🔹 ICON + TITLE */}
        <div className="title-row">
          <span className={`alert-icon ${severityClass}`}>
            {getCategoryIcon(alert?.details?.categoryDescription)}
          </span>
          <h4>{alert?.details?.typeDescription || "Alert"}</h4>
        </div>

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