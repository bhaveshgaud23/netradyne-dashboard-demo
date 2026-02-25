import { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell,
} from "recharts";

const severityColors = {
  0: "#22c55e", // INFO
  1: "#facc15", // WARN
  2: "#f97316", // MODERATE
  3: "#ef4444", // CRITICAL
};

function DurationVsSeverity({ alerts }) {
  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) return [];

    return alerts
      .filter(
        (alert) =>
          alert.duration !== undefined &&
          alert.details?.severity !== undefined
      )
      .map((alert) => ({
        duration: alert.duration,
        severity: alert.details.severity,
        severityLabel: alert.details.severityDescription,
        type: alert.details?.typeDescription,
        driver: `${alert.driver?.firstName || ""} ${alert.driver?.lastName || ""}`,
      }));
  }, [alerts]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          <p><strong>Driver:</strong> {d.driver}</p>
          <p><strong>Duration:</strong> {d.duration}s</p>
          <p><strong>Severity:</strong> {d.severityLabel}</p>
          <p><strong>Type:</strong> {d.type}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-card">
      <h3>Duration vs Severity Analysis</h3>

      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            dataKey="duration"
            name="Duration"
            unit="s"
            label={{
              value: "Duration (seconds)",
              position: "insideBottom",
              offset: -5,
            }}
          />

          <YAxis
            type="number"
            dataKey="severity"
            domain={[0, 3]}
            ticks={[0, 1, 2, 3]}
            label={{
              value: "Severity (0-3)",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <ZAxis
            type="number"
            dataKey="severity"
            range={[60, 200]}
          />

          <Tooltip content={<CustomTooltip />} />

          <Scatter data={data}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={severityColors[entry.severity]}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DurationVsSeverity;