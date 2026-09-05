import { useState, useEffect } from "react";
import { getApplications } from "../utils/storage";

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  return (
    <div>
      <h1>All Applications</h1>
      {applications.map((application, index) => {
        return (
          <div key={index}>
            <p>{application.name}</p>
            <p>{application.societyName}</p>
            <p>{application.role}</p>
            <p>{application.year}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Applications;
