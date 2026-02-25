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
} from "recharts";

function HighGForceScatter({ alerts }) {
  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) return [];

    return alerts
      .filter(
        (alert) =>
          alert.details?.maxVehicleSpeed !== undefined &&
          alert.details?.maxGForce !== undefined
      )
      .map((alert) => ({
        speed: alert.details.maxVehicleSpeed,
        gforce: alert.details.maxGForce,
        severity: alert.details.severity,
        vehicle: alert.vehicle?.vehicleNumber,
        type: alert.details?.typeDescription,
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
          <p><strong>Vehicle:</strong> {d.vehicle}</p>
          <p><strong>Speed:</strong> {d.speed} km/h</p>
          <p><strong>G-Force:</strong> {d.gforce}</p>
          <p><strong>Severity:</strong> {d.severity}</p>
          <p><strong>Type:</strong> {d.type}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-card">
      <h3>High G-Force vs Speed Analysis</h3>

      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            dataKey="speed"
            name="Speed"
            unit=" km/h"
            label={{ value: "Speed (km/h)", position: "insideBottom", offset: -5 }}
          />

          <YAxis
            type="number"
            dataKey="gforce"
            name="G-Force"
            label={{ value: "Max G-Force", angle: -90, position: "insideLeft" }}
          />

          <ZAxis type="number" dataKey="severity" range={[60, 200]} />

          <Tooltip content={<CustomTooltip />} />

          <Scatter data={data} fill="#ef4444" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HighGForceScatter;