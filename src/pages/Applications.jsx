import { useState, useEffect } from "react";
import { getApplications } from "../utils/storage";
import "./Applications.css";

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  return (
    <div className="page-container">
      <h1>All Applications</h1>

      {applications.length === 0 ? (
        <p className="empty-state">No applications yet.</p>
      ) : (
        <div className="applications-list">
          {applications.map((application, index) => (
            <div className="application-card" key={index}>
              <div className="application-header">
                <h3>{application.name}</h3>
                <span className="society-tag">{application.societyName}</span>
              </div>
              <p><strong>Role:</strong> {application.role}</p>
              <p><strong>Year:</strong> {application.year} &nbsp;•&nbsp; <strong>Branch:</strong> {application.branch}</p>
              <p className="why-text"><strong>Why you:</strong> {application.why}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;