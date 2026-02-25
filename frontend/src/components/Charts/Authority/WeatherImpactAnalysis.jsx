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

function WeatherImpactAnalysis({ alerts }) {
  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) return [];

    const weatherMap = {
      Rainy: 0,
      Foggy: 0,
      Sunny: 0,
      Clear: 0,
    };

    alerts.forEach((alert) => {
      const weather = alert.details?.weatherPrediction;

      if (weatherMap.hasOwnProperty(weather)) {
        weatherMap[weather] += 1;
      }
    });

    return Object.entries(weatherMap).map(([weather, count]) => ({
      weather,
      count,
    }));
  }, [alerts]);

  const getColor = (weather) => {
    switch (weather) {
      case "Rainy":
        return "#3b82f6";
      case "Foggy":
        return "#94a3b8";
      case "Sunny":
        return "#facc15";
      case "Clear":
        return "#22c55e";
      default:
        return "#64748b";
    }
  };

  return (
    <div className="chart-card">
      <h3>Weather Impact Analysis</h3>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="weather" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="count">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getColor(entry.weather)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeatherImpactAnalysis;