import { useEffect, useState, useRef } from "react";
import AlertCard from "./components/AlertCard";
import AlertModal from "./components/AlertModal";
import Dashboard from "./components/Dashboard";
import "leaflet/dist/leaflet.css";
import Login from "./components/Login";
import TopHeader from "./components/TopHeader";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [activeView, setActiveView] = useState("DASHBOARD");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NEWEST");
  const [toastAlerts, setToastAlerts] = useState([]);
  const [bundleMode, setBundleMode] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const knownAlertIds = useRef(new Set());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchAlerts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/alerts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");
      return await res.json();
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      return [];
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchAlerts().then((data) => {
      setAlerts(data);
      data.forEach((alert) => knownAlertIds.current.add(alert._id));
    });

    // Poll every 1 second
    const interval = setInterval(async () => {
      const data = await fetchAlerts();
      if (!data) return;
      setAlerts(data);

      const newAlerts = data.filter(
        (alert) => !knownAlertIds.current.has(alert._id),
      );

      if (newAlerts.length > 0) {
        newAlerts.forEach((alert) => knownAlertIds.current.add(alert._id));

        setAlerts(data);

        const criticalAlerts = newAlerts.filter(
          (alert) => alert.details?.severity === 3,
        );

        if (criticalAlerts.length > 0) {
          setNotificationList((prev) => [
            ...criticalAlerts.map((a) => ({ ...a, read: false })),
            ...prev,
          ]);

          if (criticalAlerts.length > 3) {
            setBundleMode(true);
            setToastAlerts(criticalAlerts);
          } else {
            setBundleMode(false);
            setToastAlerts((prev) => [...prev, ...criticalAlerts]);
          }

          setTimeout(() => {
            setToastAlerts([]);
            setBundleMode(false);
          }, 5000);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const markAsRead = (clickedAlert) => {
    setSelectedAlert(clickedAlert);

    setNotificationList((prev) =>
      prev.filter((n) => n._id !== clickedAlert._id),
    );

    setToastAlerts((prev) => prev.filter((a) => a._id !== clickedAlert._id));
  };

  const severities = [
    ...new Set(alerts.map((a) => a.details?.severityDescription)),
  ].filter(Boolean);

  const categories = [
    ...new Set(alerts.map((a) => a.details?.categoryDescription)),
  ].filter(Boolean);

  const types = [
    ...new Set(alerts.map((a) => a.details?.typeDescription)),
  ].filter(Boolean);

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

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <div className="dashboard">
        <div className="sidebar">
          <h2>AlliedGlobetech LLP</h2>

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
              Show Overall Alerts
            </button>

            <button onClick={handleLogout} style={{ marginTop: "20px" }}>
              Logout
            </button>
          </div>

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

        <div className="content">
          <TopHeader
            notificationList={notificationList}
            markAsRead={markAsRead}
            currentPage={activeView}
            onLogout={handleLogout}
          />

          {activeView === "ALERTS" && (
            <>
              {/* <h2>Alerts</h2> */}
              <div className="grid">
                {filteredAlerts.map((alert) => (
                  <AlertCard
                    key={alert._id}
                    alert={alert}
                    onClick={markAsRead}
                    isNew={toastAlerts.some((a) => a._id === alert._id)}
                    isUnread={notificationList.some((n) => n._id === alert._id)}
                  />
                ))}
              </div>
            </>
          )}

          {activeView === "DASHBOARD" && (
            <>
              {/* <h2>Dashboard</h2>/ */}
              <Dashboard
                alerts={alerts}
                notificationList={notificationList}
                setNotificationList={setNotificationList}
                onClick={markAsRead}
              />
            </>
          )}
        </div>
      </div>

      <div className="toast-container">
        {bundleMode ? (
          <div className="toast bundle-toast">
            {toastAlerts.slice(0, 3).map((alert) => (
              <div key={alert._id} className="bundle-item">
                <strong>{alert.details?.typeDescription}</strong>
                <p>
                  {alert.driver?.firstName} {alert.driver?.lastName}
                </p>
              </div>
            ))}
            {toastAlerts.length > 3 && (
              <div className="bundle-more">
                +{toastAlerts.length - 3} more alerts
              </div>
            )}
          </div>
        ) : (
          toastAlerts.map((alert) => (
            <div
              key={alert._id}
              className="toast"
              onClick={() => markAsRead(alert)}
            >
              <strong>{alert.details?.typeDescription}</strong>
              <p>
                {alert.driver?.firstName} {alert.driver?.lastName}
              </p>
            </div>
          ))
        )}
      </div>

      <AlertModal
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </>
  );
}

export default App;
