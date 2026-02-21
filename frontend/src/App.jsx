import { useEffect, useState } from "react";
import AlertCard from "./components/AlertCard";
import AlertModal from "./components/AlertModal";
import Dashboard from "./components/Dashboard";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // View state
  const [activeView, setActiveView] = useState("ALERTS");

  // Filters
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NEWEST");
  const [liveAlert, setLiveAlert] = useState(null);

  // Fetch alerts safely
  const fetchAlerts = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/alerts`);
    const data = await res.json();
    setAlerts(data);
  };

  useEffect(() => {
    fetchAlerts();

    const socket = io(import.meta.env.VITE_API_URL);

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("new-alert", (alert) => {
      console.log("New alert received:", alert);
      setAlerts(prev => [alert, ...prev]);
      setLiveAlert(alert);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Dynamic filter values
  const severities = [
    ...new Set(alerts.map((a) => a.details?.severityDescription)),
  ].filter(Boolean);

  const categories = [
    ...new Set(alerts.map((a) => a.details?.categoryDescription)),
  ].filter(Boolean);

  const types = [
    ...new Set(alerts.map((a) => a.details?.typeDescription)),
  ].filter(Boolean);

  // Filtering + Sorting
  const filteredAlerts = alerts
    .filter((alert) => {
      const severityMatch =
        severityFilter === "ALL" ||
        alert.details?.severityDescription === severityFilter;

      const categoryMatch =
        categoryFilter === "ALL" ||
        alert.details?.categoryDescription === categoryFilter;

      const typeMatch =
        typeFilter === "ALL" || alert.details?.typeDescription === typeFilter;

      return severityMatch && categoryMatch && typeMatch;
    })
    .sort((a, b) =>
      sortOrder === "NEWEST"
        ? b.timestamp - a.timestamp
        : a.timestamp - b.timestamp,
    );

  return (
    <>
      <div className="dashboard">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Allied Globetech</h2>

          {/* Navigation */}
          <div className="nav-buttons">
            <button
              className={activeView === "DASHBOARD" ? "active" : ""}
              onClick={() => setActiveView("DASHBOARD")}
            >
              Dashboard
            </button>

            <button
              className={activeView === "ALERTS" ? "active" : ""}
              onClick={() => setActiveView("ALERTS")}
            >
              Alerts
            </button>
          </div>

          {/* Filters only for Alerts */}
          {activeView === "ALERTS" && (
            <div className="filters">
              <h3>Filters</h3>

              <label>Severity</label>
              <select onChange={(e) => setSeverityFilter(e.target.value)}>
                <option value="ALL">All</option>
                {severities.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <label>Category</label>
              <select onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="ALL">All</option>
                {categories.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label>Alert Type</label>
              <select onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="ALL">All</option>
                {types.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <label>Sort By Time</label>
              <select onChange={(e) => setSortOrder(e.target.value)}>
                <option value="NEWEST">Newest First</option>
                <option value="OLDEST">Oldest First</option>
              </select>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="content">
          {activeView === "ALERTS" && (
            <>
              <h2>Alerts</h2>
              <div className="grid">
                {filteredAlerts.map((alert) => (
                  <AlertCard
                    key={alert._id}
                    alert={alert}
                    onClick={setSelectedAlert}
                  />
                ))}
              </div>
            </>
          )}

          {activeView === "DASHBOARD" && (
            <>
              <h2>Dashboard</h2>
              <Dashboard alerts={alerts} />
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <AlertModal
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
        isNew={liveAlert?._id === alert._id}
      />
      {/* Live Alert Popup */}
      {liveAlert && liveAlert.details?.severityDescription === "CRITICAL" && (
        <div className="live-popup">
          <div className="popup-content">
            <h3>🚨 New Alert Received!</h3>

            <p><strong>Type:</strong> {liveAlert.details?.typeDescription}</p>
            <p><strong>Driver:</strong> {liveAlert.driver?.firstName} {liveAlert.driver?.lastName}</p>
            <p><strong>Severity:</strong> {liveAlert.details?.severityDescription}</p>

            <button onClick={() => setLiveAlert(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
