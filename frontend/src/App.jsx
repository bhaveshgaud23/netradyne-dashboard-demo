import { useEffect, useState } from "react";
import AlertCard from "./components/AlertCard";
import AlertModal from "./components/AlertModal";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Multiple filter states
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const [sortOrder, setSortOrder] = useState("NEWEST");

  // Fetch alerts
  const fetchAlerts = async () => {
    const res = await fetch("http://localhost:5000/alerts");
    const data = await res.json();
    setAlerts(data);
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
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

  // Combined filtering logic
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
    .sort((a, b) => {
      if (sortOrder === "NEWEST") {
        return b.timestamp - a.timestamp; // Descending
      } else {
        return a.timestamp - b.timestamp; // Ascending
      }
    });

  return (
    <>
      <div className="dashboard">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Netradyne</h2>

          <div className="filters">
            <h3>Filters</h3>

            {/* Severity */}
            <label>Severity</label>
            <select onChange={(e) => setSeverityFilter(e.target.value)}>
              <option value="ALL">All</option>
              {severities.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Category */}
            <label>Category</label>
            <select onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="ALL">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Alert Type */}
            <label>Alert Type</label>
            <select onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="ALL">All</option>
              {types.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* Sort */}
            <label>Sort By Time</label>
            <select onChange={(e) => setSortOrder(e.target.value)}>
              <option value="NEWEST">Newest First</option>
              <option value="OLDEST">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <h2>Alerts</h2>

          <div className="grid">
            {filteredAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onClick={setSelectedAlert}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AlertModal
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </>
  );
}

export default App;
