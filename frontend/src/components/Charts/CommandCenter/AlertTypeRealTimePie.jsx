import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function AlertTypeRealTimePie({ alerts }) {
  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) return [];

    let collision = 0;
    let drowsiness = 0;
    let aggressive = 0;
    let other = 0;

    alerts.forEach((alert) => {
      const category = alert.details?.categoryDescription || "";
      const type = alert.details?.typeDescription || "";

      if (
        category === "Collision Alert" ||
        type.includes("COLLISION")
      ) {
        collision++;
      } else if (type.includes("DROWSINESS")) {
        drowsiness++;
      } else if (
        type.includes("HARD-BRAKING") ||
        type.includes("HARD-TURN") ||
        type.includes("HARD-ACCELERATION")
      ) {
        aggressive++;
      } else {
        other++;
      }
    });

    return [
      { name: "Collision", value: collision },
      { name: "Drowsiness", value: drowsiness },
      { name: "Hard-Brake/Aggressive", value: aggressive },
      { name: "Other", value: other },
    ].filter((item) => item.value > 0);
  }, [alerts]);

  const COLORS = [
    "#ef4444", // Collision - Red
    "#f97316", // Drowsiness - Orange
    "#facc15", // Aggressive - Yellow
    "#3b82f6", // Other - Blue
  ];

  return (
    <div className="live-stream-card">
      <h3>📊 Real-Time Alert Type Distribution</h3>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={140}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
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

export default AlertTypeRealTimePie;