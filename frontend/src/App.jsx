import { useEffect, useState } from "react";
import AlertCard from "./components/AlertCard";
import FilterPanel from "./components/FilterPanel";
import AlertModal from "./components/AlertModal";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [selectedAlert, setSelectedAlert] = useState(null);

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

  const filteredAlerts =
    category === "ALL"
      ? alerts
      : alerts.filter((a) => a.details.categoryDescription === category);

  return (
    <>
      <div className="dashboard">
        <div className="sidebar">
          <h2>Netradyne</h2>
          <FilterPanel setCategory={setCategory} />
        </div>

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

      <AlertModal
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </>
  );
}

export default App;
