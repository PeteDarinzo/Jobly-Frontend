import React from "react";
import "./Card.css";

const JobCard = ({ title, salary, equity, companyName }) => {

  return (
    <div className="CompanyCard shadow p-3">
      <h2>{title}</h2>
      <p>{companyName}</p>
      <p>Salary: {salary}</p>
      <p>Equity: {equity}</p>
    </div>
  );

}

export default JobCard;