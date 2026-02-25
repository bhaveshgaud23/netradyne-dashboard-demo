import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = {
  Front: "#ef4444",
  Rear: "#3b82f6",
  Left: "#facc15",
  Right: "#22c55e",
  Unknown: "#94a3b8",
};

function ImpactDirectionChart({ alerts }) {
  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) return [];

    const impactMap = {
      Front: 0,
      Rear: 0,
      Left: 0,
      Right: 0,
      Unknown: 0,
    };

    alerts.forEach((alert) => {
      const impact = alert.details?.pointOfImpact;

      if (impactMap.hasOwnProperty(impact)) {
        impactMap[impact] += 1;
      } else {
        impactMap["Unknown"] += 1;
      }
    });

    return Object.entries(impactMap)
      .filter(([, value]) => value > 0)
      .map(([key, value]) => ({
        name: key,
        value,
      }));
  }, [alerts]);

  return (
    <div className="chart-card">
      <h3>Impact Direction Analysis</h3>

      <ResponsiveContainer width="100%" height={450}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ImpactDirectionChart;