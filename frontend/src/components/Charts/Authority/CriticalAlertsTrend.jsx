import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function CriticalAlertsTrend({ alerts }) {
  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) return [];

    const dailyMap = {};

    alerts.forEach((alert) => {
      if (alert.details?.severity === 3) {
        const date = new Date(alert.timestamp)
          .toISOString()
          .split("T")[0]; // YYYY-MM-DD

        if (!dailyMap[date]) {
          dailyMap[date] = { date, count: 0 };
        }

        dailyMap[date].count += 1;
      }
    });

    return Object.values(dailyMap).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [alerts]);

  return (
    <div className="chart-card">
      <h3>Critical Alerts Trend</h3>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            tickFormatter={(date) =>
              new Date(date).toLocaleDateString()
            }
          />

          <YAxis />

          <Tooltip
            labelFormatter={(label) =>
              new Date(label).toLocaleDateString()
            }
          />

          <Line
            type="monotone"
            dataKey="count"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CriticalAlertsTrend;