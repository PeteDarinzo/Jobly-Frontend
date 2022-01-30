import React from "react";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import "./CompanyDetail.css";
import { v4 as uuid } from "uuid";

const CompanyDetail = ({ companies, jobs }) => {

  const { handle } = useParams();

  const company = companies.find(company => company.handle === handle);
  const openings = jobs.filter(job => job.companyName === company.name);
  console.log("openings: ", openings);

  return (
    <div>
      <div className="CompanyDetail-title">
        <h1>{company.name}</h1>
        <h2>{company.description}</h2>
      </div>
      <div>
        {openings.map(job => (
          <JobCard
            title={job.title}
            companyName={job.companyName}
            salary={job.salary}
            equity={job.equity}
            key={uuid()}
          />
        ))}
      </div>
    </div>
  );

}

export default CompanyDetail;