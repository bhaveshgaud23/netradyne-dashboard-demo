import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import "./RiskOverviewKPI.css";

function AlertsByCategoryStacked({ alerts }) {
  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) return [];

    const categoryMap = {};

    alerts.forEach((alert) => {
      const category =
        alert.details?.categoryDescription || "Unknown";
      const severity =
        alert.details?.severityDescription || "INFO";

      if (!categoryMap[category]) {
        categoryMap[category] = {
          category,
          INFO: 0,
          WARN: 0,
          MODERATE: 0,
          CRITICAL: 0,
        };
      }

      if (categoryMap[category][severity] !== undefined) {
        categoryMap[category][severity] += 1;
      }
    });

    return Object.values(categoryMap);
  }, [alerts]);

  return (
    <div className="chart-card">
      <h3>Alerts by Category (Severity Breakdown)</h3>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Stacked Bars */}
          <Bar dataKey="INFO" stackId="a" fill="#60a5fa" />
          <Bar dataKey="WARN" stackId="a" fill="#facc15" />
          <Bar dataKey="MODERATE" stackId="a" fill="#fb923c" />
          <Bar dataKey="CRITICAL" stackId="a" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AlertsByCategoryStacked;