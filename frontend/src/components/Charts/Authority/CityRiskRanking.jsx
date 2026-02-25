import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

function CityRiskRanking({ alerts }) {
  const [viewMode, setViewMode] = useState("city"); // city | state

  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) return [];

    const locationMap = {};

    alerts.forEach((alert) => {
      const city = alert.details?.location?.city || "Unknown";
      const state = alert.details?.location?.state || "Unknown";

      const key = viewMode === "city" ? city : state;

      if (!locationMap[key]) {
        locationMap[key] = {
          name: key,
          total: 0,
          critical: 0,
        };
      }

      locationMap[key].total += 1;

      if (alert.details?.severity === 3) {
        locationMap[key].critical += 1;
      }
    });

    return Object.values(locationMap)
      .sort((a, b) => b.total - a.total)
      .slice(0, 10); // Top 10
  }, [alerts, viewMode]);

  return (
    <div className="chart-card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>City/State Risk Ranking</h3>

        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          style={{ padding: "6px" }}
        >
          <option value="city">By City</option>
          <option value="state">By State</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          
          <Bar dataKey="total">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.critical > 0 ? "#ef4444" : "#3b82f6"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CityRiskRanking;