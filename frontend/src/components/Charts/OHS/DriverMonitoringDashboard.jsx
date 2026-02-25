import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MONITORING_TYPES = [
  "DRIVER-DROWSINESS",
  "SEATBELT-COMPLIANCE",
  "FACE-MASK-COMPLIANCE",
];

function DriverMonitoringDashboard({ alerts }) {
  const { data, complianceRate } = useMemo(() => {
    if (!alerts || alerts.length === 0) {
      return { data: [], complianceRate: 100 };
    }

    let monitoringCount = 0;

    alerts.forEach((alert) => {
      const type = alert.details?.typeDescription;

      if (MONITORING_TYPES.includes(type)) {
        monitoringCount += 1;
      }
    });

    const total = alerts.length;

    const complianceRate =
      total === 0
        ? 100
        : (100 - (monitoringCount / total) * 100).toFixed(1);

    const data = [
      { name: "Compliant", value: total - monitoringCount },
      { name: "Non-Compliant", value: monitoringCount },
    ];

    return { data, complianceRate };
  }, [alerts]);

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="chart-card">
      <h3>Driver Monitoring Compliance</h3>

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h2 style={{ color: complianceRate < 80 ? "#ef4444" : "#22c55e" }}>
          {complianceRate}% Compliance Rate
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={140}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DriverMonitoringDashboard;