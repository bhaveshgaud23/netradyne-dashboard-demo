import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function AlertStatusBreakdown({ alerts }) {
  const { data, pendingPercentage } = useMemo(() => {
    if (!alerts || alerts.length === 0) {
      return { data: [], pendingPercentage: 0 };
    }

    let confirmed = 0;
    let pending = 0;

    alerts.forEach((alert) => {
      if (alert.status === "CONFIRMED") confirmed++;
      if (alert.status === "PENDING_REVIEW") pending++;
    });

    const total = confirmed + pending;

    const pendingPercentage =
      total === 0 ? 0 : ((pending / total) * 100).toFixed(1);

    const data = [
      { name: "CONFIRMED", value: confirmed },
      { name: "PENDING_REVIEW", value: pending },
    ];

    return { data, pendingPercentage };
  }, [alerts]);

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="live-stream-card">
      <h3>📊 Alert Status Breakdown</h3>

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h2
          style={{
            color: pendingPercentage > 40 ? "#ef4444" : "#22c55e",
          }}
        >
          {pendingPercentage}% Pending
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AlertStatusBreakdown;