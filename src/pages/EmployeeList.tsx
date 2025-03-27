import React from "react";

const EmployeeList: React.FC = () => (
  <div>
    <h1>Employee List</h1>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ backgroundColor: "#f0f0f0" }}>
          <th style={{ padding: "8px", textAlign: "left" }}>Name</th>
          <th style={{ padding: "8px", textAlign: "left" }}>Department</th>
          <th style={{ padding: "8px", textAlign: "left" }}>Position</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: "8px" }}>John Doe</td>
          <td style={{ padding: "8px" }}>IT</td>
          <td style={{ padding: "8px" }}>Software Engineer</td>
        </tr>
        <tr>
          <td style={{ padding: "8px" }}>Jane Smith</td>
          <td style={{ padding: "8px" }}>HR</td>
          <td style={{ padding: "8px" }}>HR Manager</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default EmployeeList;
