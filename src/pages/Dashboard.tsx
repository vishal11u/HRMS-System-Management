import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard Overview</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ width: "48%", backgroundColor: "#f0f0f0", padding: "20px" }}
        >
          <h2>Total Employees</h2>
          <p>250</p>
        </div>
        <div
          style={{ width: "48%", backgroundColor: "#f0f0f0", padding: "20px" }}
        >
          <h2>Open Positions</h2>
          <p>15</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
