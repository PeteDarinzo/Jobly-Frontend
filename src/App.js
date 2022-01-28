import './App.css';
import Routes from "./Routes"
import Navbar from './Navbar';
import React, { useState, useEffect } from "react";
import JoblyApi from "./Api.js";


function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);

  /** On mount, request all companies from JoblyApi */
  useEffect(() => {
    async function getData() {
      let companies = await JoblyApi.getAllCompanies();
      let jobs = await JoblyApi.getAllJobs();
      setCompanies(companies);
      setJobs(jobs);
      setIsLoading(false);
    }
    getData();
  }, []);

  if (isLoading) {
    return (<p>Loading...</p>);
  }



  return (
    <div className="App">
      <Navbar />
      <Routes companies={companies} jobs={jobs} />
    </div>
  );
}

export default App;
