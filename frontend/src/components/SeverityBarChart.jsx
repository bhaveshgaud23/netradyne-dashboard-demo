import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  
  function SeverityBarChart({ alerts }) {
    // Count alerts by severityDescription
    const severityCounts = alerts.reduce((acc, alert) => {
      const severity = alert.details?.severityDescription || "UNKNOWN";
      acc[severity] = (acc[severity] || 0) + 1;
      return acc;
    }, {});
  
    const data = Object.keys(severityCounts).map((key) => ({
      severity: key,
      count: severityCounts[key],
    }));
  
    return (
      <div className="chart-card">
        <h3>Alerts by Severity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="severity" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  export default SeverityBarChart;
  