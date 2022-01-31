import './App.css';
import Routes from "./Routes"
import NavBar from './NavBar';
import React, { useState, useEffect } from "react";
import JoblyApi from "./Api.js";
import jwt_decode from "jwt-decode";

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [userName, setUserName] = useState("");
  const [userCredentials, setUserCredentials] = useState({});

  /** On mount, request all companies from JoblyApi */
  useEffect(() => {
    console.log("Token: ", userToken);

    function loadUserToken() {
      if (localStorage.getItem("joblyToken") === null) {
        localStorage.setItem("joblyToken", JSON.stringify(userToken));
      } else {
        setUserToken(() => JSON.parse(localStorage.getItem("joblyToken")));
      }
      // const decoded = jwt_decode(userToken);
      // console.log(decoded);
    }

    async function getData() {
      let companies = await JoblyApi.getAllCompanies();
      let jobs = await JoblyApi.getAllJobs();
      setCompanies(companies);
      setJobs(jobs);
      setIsLoading(false);
    }

    loadUserToken();
    getData();
  }, []);


  // useEffect(() => {

  //   async function getUserCredentials(username) {
  //     const credentials = JoblyApi.getCredentials(username)
  //   }

  //   getUserCredentials();

  // }, [userToken]);

  /** when a user logs in, request their token, put into local storage, and store in state */
  async function login(userData) {
    const token = await JoblyApi.getToken(userData);
    localStorage.setItem("joblyToken", JSON.stringify(token));
    setUserToken(token);
  }

  /** when a user logs out, set the token to an empty string */
  function logout() {
    localStorage.removeItem("joblyToken");
    setUserToken("");
  }

  /** when a user signs up, register, then store token */
  async function register(userData) {
    const token = await JoblyApi.register(userData);
    localStorage.setItem("joblyToken", JSON.stringify(token));
    setUserToken(token);
  }

  if (isLoading) {
    return (<p>Loading...</p>);
  }

  return (
    <div className="App">
      <NavBar loggedIn={userToken} />
      <Routes
        companies={companies}
        jobs={jobs}
        register={register}
        login={login}
        logout={logout}
        loggedIn={userToken}
      />
    </div>
  );
}

export default App;
