import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function SpeedLineChart({ alerts }) {
  const [selectedVehicle, setSelectedVehicle] = useState("");

  // Get unique vehicles
  const vehicleList = useMemo(() => {
    return [...new Set(alerts.map(a => a.vehicle?.vehicleNumber))]
      .filter(Boolean);
  }, [alerts]);

  // Filter alerts for selected vehicle
  const chartData = useMemo(() => {
    if (!selectedVehicle) return [];
  
    return alerts
      .filter(alert => alert.vehicle?.vehicleNumber === selectedVehicle)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(alert => ({
        time: alert.timestamp,
        speed: alert.details?.maxVehicleSpeed ?? 0,
        typeDescription: alert.details?.typeDescription ?? "N/A",
      }));
  }, [alerts, selectedVehicle]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
  
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          <p><strong>Date & Time:</strong> {new Date(label).toLocaleString()}</p>
          <p><strong>Speed:</strong> {data.speed} km/h</p>
          <p><strong>Alert Type:</strong> {data.typeDescription}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-card">
      <h3>Vehicle Speed While Alert</h3>

      {/* ✅ Vehicle Dropdown */}
      <select
        value={selectedVehicle}
        onChange={(e) => setSelectedVehicle(e.target.value)}
        style={{ marginBottom: "15px", padding: "6px" }}
      >
        <option value="">Select Vehicle</option>
        {vehicleList.map((vehicle) => (
          <option key={vehicle} value={vehicle}>
            {vehicle}
          </option>
        ))}
      </select>

      {selectedVehicle && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            {/* Format time properly */}
            <XAxis
              dataKey="time"
              tickFormatter={(time) =>
                new Date(time).toLocaleTimeString()
              }
            />

            <YAxis
              label={{
                value: "Speed (km/h)",
                angle: -90,
                position: "insideLeft",
              }}
            />

<Tooltip content={<CustomTooltip />} />

            {/* Single Selected Vehicle Line */}
            <Line
              type="monotone"
              dataKey="speed"
              strokeWidth={4}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpeedLineChart;