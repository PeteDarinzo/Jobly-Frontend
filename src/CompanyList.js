import React, { useState } from "react";
import CompanyCard from "./CompanyCard";
import { Link } from "react-router-dom";
import "./CompanyList.css";
import CompanySearchForm from "./CompanySearchForm";
import "./Form.css";


/** A component to render a list of company cards  */

const CompanyList = ({ companies, filter }) => {

  return (
    <div className="CompanyList">
      <h1>All Companies:</h1>
      <CompanySearchForm filter={filter} />
      <div className="CompanyList-list">
        {companies.map(company => (
          <Link to={`companies/${company.handle}`} className="CompanyList-link" key={company.handle}>
            <CompanyCard name={company.name} description={company.description} />
          </Link>
        ))}
      </div>
    </div >
  );
}

export default CompanyList;