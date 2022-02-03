import React from "react";
import JobCard from "./JobCard";
import "./JobList.css";


/** Generic component to display a job cards */

const JobList = ({ jobs, apply, applications }) => {

  return (
    <div className="JobList">
      <h1>All Jobs:</h1>
      <div>
        {jobs.map(job => (
          <JobCard
            id={job.id}
            title={job.title}
            companyName={job.companyName}
            salary={job.salary}
            equity={job.equity}
            apply={apply}
            applied={applications.indexOf(job.id) >= 0}
            key={job.id}
          />
        ))}
      </div>
    </div>
  );
}

export default JobList;