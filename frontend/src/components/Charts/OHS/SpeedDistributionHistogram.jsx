import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function SpeedDistributionHistogram({ alerts }) {
  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) return [];

    const bins = [
      { range: "0-20", min: 0, max: 20, count: 0 },
      { range: "20-40", min: 20, max: 40, count: 0 },
      { range: "40-60", min: 40, max: 60, count: 0 },
      { range: "60-80", min: 60, max: 80, count: 0 },
      { range: "80+", min: 80, max: Infinity, count: 0 },
    ];

    alerts.forEach((alert) => {
      const speed = alert.details?.maxVehicleSpeed;

      if (speed === undefined || speed === null) return;

      bins.forEach((bin) => {
        if (speed >= bin.min && speed < bin.max) {
          bin.count += 1;
        }
      });
    });

    return bins.map(({ range, count }) => ({
      range,
      count,
    }));
  }, [alerts]);

  return (
    <div className="chart-card">
      <h3>Speed Distribution Histogram</h3>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpeedDistributionHistogram;