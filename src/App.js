import './App.css';
import Routes from "./Routes"
import NavBar from './NavBar';
import React, { useState, useEffect } from "react";
import JoblyApi from "./Api.js";


function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState("");

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


  useEffect(() => {
    setLoggedIn(!loggedIn);
  }, [userToken]);


  async function login(userData) {
    const token = await JoblyApi.getToken(userData);
    console.log(token);
    setUserToken(token);
  }

  function logout() {
    console.log(loggedIn);
    console.log(userToken);
    setLoggedIn(false);
    setUserToken("");
  }

  async function register(userData) {
    const token = await JoblyApi.register(userData);
    console.log(token);
    setUserToken(token);
  }


  if (isLoading) {
    return (<p>Loading...</p>);
  }

  return (
    <div className="App">
      <NavBar loggedIn={loggedIn} />
      <Routes
        companies={companies}
        jobs={jobs}
        register={register}
        login={login}
        logout={logout}
      />
    </div>
  );
}

export default App;
