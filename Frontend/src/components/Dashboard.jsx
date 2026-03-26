import { useEffect, useState } from "react";
import api from "../services/api";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "../style/Dashboard.css"

export default function Dashboard() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/jobs/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Calculations
  const total = stats.reduce((acc, item) => acc + item.count, 0);
  const offers = stats.find((s) => s._id === "Offer")?.count || 0;
  const interviews = stats.find((s) => s._id === "Interview")?.count || 0;

  const successRate = total ? ((offers / total) * 100).toFixed(1) : 0;

  // Insights
  let message = "";

  if (total > 10 && interviews === 0) {
    message = "You are applying but not getting interviews. Improve resume.";
  } else if (interviews > 0 && offers === 0) {
    message = "You're getting interviews. Work on interview skills.";
  } else if (offers > 0) {
    message = "Great! You're getting offers.";
  }

  // Sort stats
  const sortedStats = [...stats].sort((a, b) => b.count - a.count);

 return (
  <div className="dashboard-wrapper">
    <h2 className="dashboard-title">Dashboard 📊</h2>

    <div className="stats-summary">
      <div className="summary-item">
        <h3>Total Applications: <strong>{total}</strong></h3>
      </div>
      <div className="summary-item" style={{ borderLeft: "4px solid #10b981" }}>
        <h3>Success Rate: <strong>{successRate}%</strong></h3>
      </div>
    </div>

    {/* Small Stat Cards in Grid */}
    <div className="cards-container">
      {sortedStats.map((item) => (
        <div key={item._id} className="stat-card">
          <h3>{item._id}</h3>
          <p>{item.count}</p>
        </div>
      ))}
    </div>

    {/* Smaller Pie Chart */}
    <div className="chart-wrapper">
      <PieChart width={220} height={220}>
        <Pie 
          data={stats} 
          dataKey="count" 
          nameKey="_id" 
          outerRadius={80} 
          innerRadius={50} /* Made it a Donut for a more modern look */
          stroke="none"
        >
          {stats.map((_, index) => (
            <Cell key={index} fill={index % 2 === 0 ? '#6366f1' : '#a855f7'} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
        />
      </PieChart>
    </div>
  </div>
);
}