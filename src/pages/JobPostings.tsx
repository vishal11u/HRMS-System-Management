import React from "react";

const JobPostings: React.FC = () => (
  <div>
    <h1>Job Postings</h1>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ backgroundColor: "#f0f0f0" }}>
          <th style={{ padding: "8px", textAlign: "left" }}>Job Title</th>
          <th style={{ padding: "8px", textAlign: "left" }}>Department</th>
          <th style={{ padding: "8px", textAlign: "left" }}>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: "8px" }}>Software Engineer</td>
          <td style={{ padding: "8px" }}>IT</td>
          <td style={{ padding: "8px" }}>Open</td>
        </tr>
        <tr>
          <td style={{ padding: "8px" }}>HR Specialist</td>
          <td style={{ padding: "8px" }}>HR</td>
          <td style={{ padding: "8px" }}>Closed</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default JobPostings;
