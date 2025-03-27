import React from "react";

const Payroll: React.FC = () => (
  <div>
    <h1>Payroll Management</h1>
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
      <p>Salary processing and management</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#e0e0e0" }}>
            <th style={{ padding: "8px", textAlign: "left" }}>Employee</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Salary</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "8px" }}>John Doe</td>
            <td style={{ padding: "8px" }}>$5,000</td>
            <td style={{ padding: "8px" }}>Processed</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default Payroll;
