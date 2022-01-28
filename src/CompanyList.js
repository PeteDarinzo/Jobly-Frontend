import React from "react";
import CompanyCard from "./CompanyCard";
import { Link } from "react-router-dom";
import "./CompanyList.css";
import CompanySearchForm from "./CompanySearchForm";
import { v4 as uuid } from "uuid";
import JoblyApi from "./Api";


const CompanyList = ({ companies }) => {

  async function filterCompanies(term) {
    const res = await JoblyApi.getAllCompanies({ query: term });
    console.log(res);
  }

  return (
    <div>
      <h1>All Companies:</h1>
      <CompanySearchForm filter={filterCompanies} />
      {companies.map(company => (
        <Link to={`companies/${company.handle}`} className="CompanyListLink" key={uuid()}>
          <CompanyCard name={company.name} description={company.description} />
        </Link>
      ))
      }
    </div >
  );
}

export default CompanyList;