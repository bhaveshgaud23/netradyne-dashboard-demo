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

function VehicleStressScore({ alerts }) {
  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) return [];

    const vehicleMap = {};

    alerts.forEach((alert) => {
      const vehicle = alert.vehicle?.vehicleNumber;
      if (!vehicle) return;

      const severity = alert.details?.severity || 0;
      const gForce = alert.details?.maxGForce || 0;
      const type = alert.details?.typeDescription || "";

      if (!vehicleMap[vehicle]) {
        vehicleMap[vehicle] = {
          vehicle,
          score: 0,
        };
      }

      // High-G
      if (gForce >= HIGH_G_THRESHOLD) {
        vehicleMap[vehicle].score += 5;
      }

      // Critical alerts
      if (severity === 3) {
        vehicleMap[vehicle].score += 4;
      }

      // Moderate alerts
      if (severity === 2) {
        vehicleMap[vehicle].score += 2;
      }

      // Hard braking / hard turn
      if (
        type.includes("HARD-BRAKING") ||
        type.includes("HARD-TURN") ||
        type.includes("HARD-ACCELERATION")
      ) {
        vehicleMap[vehicle].score += 3;
      }
    });

    return Object.values(vehicleMap)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Top 10 risky vehicles
  }, [alerts]);

  return (
    <div className="chart-card">
      <h3>Vehicle Stress Score Ranking</h3>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" />
          <YAxis
            dataKey="vehicle"
            type="category"
            width={130}
          />

          <Tooltip />

          <Bar dataKey="score">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.score > 20
                    ? "#ef4444"
                    : entry.score > 10
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

export default VehicleStressScore;