import { useState, useMemo } from "react";
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
  // Get unique vehicle numbers
  const vehicleList = useMemo(() => {
    return [...new Set(alerts.map((a) => a.vehicle?.vehicleNumber))].filter(
      Boolean
    );
  }, [alerts]);

  const [selectedVehicle, setSelectedVehicle] = useState("");

  // Filter alerts by selected vehicle
  const filteredData = useMemo(() => {
    if (!selectedVehicle) return [];

    return alerts
      .filter((a) => a.vehicle?.vehicleNumber === selectedVehicle)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((alert) => ({
        time: new Date(alert.timestamp).toLocaleTimeString(),
        speed: alert.details?.maxVehicleSpeed || 0,
      }));
  }, [alerts, selectedVehicle]);

  return (
    <div className="chart-card">
      <h3>Vehicle Speed Over Time</h3>

      {/* Vehicle Selector */}
      <select
        className="vehicle-select"
        value={selectedVehicle}
        onChange={(e) => setSelectedVehicle(e.target.value)}
      >
        <option value="">Select Vehicle</option>
        {vehicleList.map((vehicle, index) => (
          <option key={index} value={vehicle}>
            {vehicle}
          </option>
        ))}
      </select>

      {selectedVehicle && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="speed"
              stroke="#1e3a8a"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpeedLineChart;
