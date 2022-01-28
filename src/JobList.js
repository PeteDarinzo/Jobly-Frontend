import React from "react";
import JobCard from "./JobCard";
import { v4 as uuid } from "uuid";


const JobList = ({ jobs }) => {

  return (
    <div>
      <h1>All Jobs:</h1>
      {jobs.map(job => (
        <JobCard
          title={job.title}
          companyName={job.companyName}
          salary={job.salary}
          equity={job.equity}
          key={uuid()}
        />
      ))}
    </div>
  );
}

export default JobList;