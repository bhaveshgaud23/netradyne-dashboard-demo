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

function VehiclesHighGEvents({ alerts }) {
  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) return [];

    const vehicleMap = {};

    alerts.forEach((alert) => {
      const gForce = alert.details?.maxGForce;
      const vehicle = alert.vehicle?.vehicleNumber;

      if (!vehicle || gForce === undefined) return;

      if (gForce >= HIGH_G_THRESHOLD) {
        if (!vehicleMap[vehicle]) {
          vehicleMap[vehicle] = {
            vehicle,
            count: 0,
          };
        }

        vehicleMap[vehicle].count += 1;
      }
    });

    return Object.values(vehicleMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 Vehicles
  }, [alerts]);

  return (
    <div className="chart-card">
      <h3>Vehicles with Most High-G Events</h3>

      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" />
          <YAxis
            dataKey="vehicle"
            type="category"
            width={120}
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

export default VehiclesHighGEvents;