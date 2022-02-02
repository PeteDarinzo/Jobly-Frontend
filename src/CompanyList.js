import React, { useState } from "react";
import CompanyCard from "./CompanyCard";
import { Link } from "react-router-dom";
import "./CompanyList.css";
import CompanySearchForm from "./CompanySearchForm";
import JoblyApi from "./Api";
import "./Form.css";

const CompanyList = ({ companies }) => {

  const [companyList, setCompanyList] = useState(companies)

  /** Take the filter from the search form, return companies mathing filter query
   *  getAllCompanies takes an object and sets it as data in the request
   *  "name" is the filter to search companies by name
   */
  async function filterCompanies(term) {
    const res = await JoblyApi.getAllCompanies({ name: term });
    setCompanyList(res)
  }

  return (
    <div className="CompanyList">
      <h1>All Companies:</h1>
      <CompanySearchForm filter={filterCompanies} />
      <div className="CompanyList-list">
        {companyList.map(company => (
          <Link to={`companies/${company.handle}`} className="CompanyList-link" key={company.handle}>
            <CompanyCard name={company.name} description={company.description} />
          </Link>
        ))}
      </div>
    </div >
  );
}

export default CompanyList;