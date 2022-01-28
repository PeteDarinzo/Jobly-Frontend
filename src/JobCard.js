import React from "react";

const JobCard = ({ title, salary, equity, companyName }) => {

  return (
    <div className="CompanyCard">
      <h2>{title}</h2>
      <p>{companyName}</p>
      <p>Salary: {salary}</p>
      <p>Equity: {equity}</p>
    </div>
  );

}

export default JobCard;