import { useMemo } from "react";
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

function CriticalAlertsByDriver({ alerts }) {
  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) return [];

    const driverMap = {};

    alerts.forEach((alert) => {
      if (alert.details?.severity !== 3) return;

      const driverId = alert.driver?.driverId;
      const firstName = alert.driver?.firstName || "";
      const lastName = alert.driver?.lastName || "";

      if (!driverId) return;

      const fullName = `${firstName} ${lastName}`;

      if (!driverMap[driverId]) {
        driverMap[driverId] = {
          driver: fullName,
          count: 0,
        };
      }

      driverMap[driverId].count += 1;
    });

    return Object.values(driverMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 most critical drivers
  }, [alerts]);

  return (
    <div className="chart-card">
      <h3>Critical Alerts by Driver</h3>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" />
          <YAxis
            dataKey="driver"
            type="category"
            width={160}
          />

          <Tooltip />

          <Bar dataKey="count">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill="#ef4444"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CriticalAlertsByDriver;