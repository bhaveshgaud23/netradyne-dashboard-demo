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

const HIGH_G_THRESHOLD = 2.0;

function DriverRiskLeaderboard({ alerts }) {
  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) return [];

    const driverMap = {};

    alerts.forEach((alert) => {
      const driverId = alert.driver?.driverId;
      const firstName = alert.driver?.firstName || "";
      const lastName = alert.driver?.lastName || "";
      const severity = alert.details?.severity || 0;
      const gForce = alert.details?.maxGForce || 0;
      const type = alert.details?.typeDescription || "";

      if (!driverId) return;

      const fullName = `${firstName} ${lastName}`;

      if (!driverMap[driverId]) {
        driverMap[driverId] = {
          driver: fullName,
          score: 0,
        };
      }

      // Severity weights
      if (severity === 3) driverMap[driverId].score += 5;
      if (severity === 2) driverMap[driverId].score += 3;
      if (severity === 1) driverMap[driverId].score += 1;

      // High G-Force
      if (gForce >= HIGH_G_THRESHOLD) {
        driverMap[driverId].score += 3;
      }

      // High risk behaviors
      if (type.includes("DROWSINESS")) {
        driverMap[driverId].score += 6;
      }

      if (
        type.includes("TRAFFIC-LIGHT-VIOLATION") ||
        type.includes("SIGN-VIOLATIONS") ||
        type.includes("RELATIVE-SPEEDING")
      ) {
        driverMap[driverId].score += 4;
      }
    });

    return Object.values(driverMap)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Top 10 Risky Drivers
  }, [alerts]);

  return (
    <div className="chart-card">
      <h3>Driver Risk Leaderboard</h3>

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

          <Bar dataKey="score">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.score > 25
                    ? "#ef4444"
                    : entry.score > 15
                    ? "#f97316"
                    : "#22c55e"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DriverRiskLeaderboard;