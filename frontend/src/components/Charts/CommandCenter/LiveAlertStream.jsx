import { useEffect, useState } from "react";
import "./LiveAlertStream.css";

function LiveAlertStream({ alerts }) {
  const [liveAlerts, setLiveAlerts] = useState([]);

  useEffect(() => {
    if (!alerts) return;

    // Sort newest first
    const sorted = [...alerts].sort(
      (a, b) => b.timestamp - a.timestamp
    );

    setLiveAlerts(sorted.slice(0, 20)); // Show latest 20
  }, [alerts]);

  return (
    <div className="live-stream-card">
      <h3>🚨 Live Alert Stream</h3>

      <div className="alert-list">
        {liveAlerts.map((alert, index) => {
          const isCritical = alert.details?.severity === 1;

          return (
            <div
              key={index}
              className={`alert-item ${
                isCritical ? "critical-alert" : ""
              }`}
            >
              <div className="alert-time">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </div>

              <div className="alert-main">
                <strong>{alert.vehicle?.vehicleNumber}</strong> |
                {" "}
                {alert.driver?.firstName} {alert.driver?.lastName}
              </div>

              <div className="alert-type">
                {alert.details?.typeDescription}
              </div>

              <div className="alert-location">
                {alert.details?.location?.city}
              </div>

              <div className="alert-severity">
                {alert.details?.severityDescription}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LiveAlertStream;