import React from "react";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import "./CompanyDetail.css";


/** Generic component to display a company, and its list of open jobs */

const CompanyDetail = ({ companies, jobs, apply, applications }) => {

  const { handle } = useParams();

  const company = companies.find(company => company.handle === handle);
  const openings = jobs.filter(job => job.companyName === company.name);

  return (
    <div className="CompanyDetail">
      <div className="CompanyDetail-title shadow">
        <h1>{company.name}</h1>
        <h2>{company.description}</h2>
      </div>
      <div className="CompanyDetail-list">
        <h3>Open Positions:</h3>
        {openings.map(job => (
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

export default CompanyDetail;