import { useMemo } from "react";
import "./RiskOverviewKPI.css";

function RiskOverviewKPI({ alerts }) {
  const metrics = useMemo(() => {
    if (!alerts || alerts.length === 0) {
      return {
        total: 0,
        criticalCount: 0,
        criticalPercentage: 0,
        topRiskCity: "N/A",
        trendPercentage: 0,
      };
    }

    const total = alerts.length;

    // 🔴 Critical Alerts
    const criticalAlerts = alerts.filter(
      (a) => a.details?.severity === 3
    );
    const criticalCount = criticalAlerts.length;

    const criticalPercentage = (
      (criticalCount / total) *
      100
    ).toFixed(1);

    // 🌍 Top Risk City
    const cityCounts = alerts.reduce((acc, alert) => {
      const city = alert.details?.location?.city || "Unknown";
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    const topRiskCity =
      Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "N/A";

    // 📈 Risk Trend (Last 24h vs Previous 24h)
    const now = Date.now();
    const last24h = alerts.filter(
      (a) => now - a.timestamp <= 24 * 60 * 60 * 1000
    );

    const prev24h = alerts.filter(
      (a) =>
        now - a.timestamp > 24 * 60 * 60 * 1000 &&
        now - a.timestamp <= 48 * 60 * 60 * 1000
    );

    const trendPercentage =
      prev24h.length === 0
        ? 100
        : (((last24h.length - prev24h.length) / prev24h.length) * 100).toFixed(
            1
          );

    return {
      total,
      criticalCount,
      criticalPercentage,
      topRiskCity,
      trendPercentage,
    };
  }, [alerts]);

  return (
    <div className="authority-kpi-grid">
      <div className="kpi-card">
        <h4>Total Alerts</h4>
        <h2>{metrics.total}</h2>
      </div>

      <div className="kpi-card critical">
        <h4>Critical Alerts</h4>
        <h2>
          {metrics.criticalCount} ({metrics.criticalPercentage}%)
        </h2>
      </div>

      <div className="kpi-card">
        <h4>Top Risk City</h4>
        <h2>{metrics.topRiskCity}</h2>
      </div>

      <div className="kpi-card">
        <h4>24h Risk Trend</h4>
        <h2
          style={{
            color:
              metrics.trendPercentage > 0 ? "red" : "green",
          }}
        >
          {metrics.trendPercentage > 0 ? "▲" : "▼"}{" "}
          {Math.abs(metrics.trendPercentage)}%
        </h2>
      </div>
    </div>
  );
}

export default RiskOverviewKPI;