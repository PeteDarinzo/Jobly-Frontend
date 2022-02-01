import './App.css';
import Routes from "./Routes"
import NavBar from './NavBar';
import React, { useState, useEffect } from "react";
import JoblyApi from "./Api.js";
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [userCredentials, setUserCredentials] = useState({});

  /** On mount, request all companies from JoblyApi */
  useEffect(() => {

    async function getData() {
      let companies = await JoblyApi.getAllCompanies();
      let jobs = await JoblyApi.getAllJobs();
      setCompanies(() => companies);
      setJobs(() => jobs);
      setIsLoading(() => false);
    }

    function loadUserToken() {
      if (localStorage.getItem("joblyToken") === null) {
        localStorage.setItem("joblyToken", JSON.stringify(""));
      } else {
        const token = JSON.parse(localStorage.getItem("joblyToken"));
        JoblyApi.token = token; // set API token on refresh
        setUserToken(() => token);
      }
    }

    getData();
    loadUserToken();

  }, []);

  // on sign in, get the user's credentials
  useEffect(() => {

    // query API for a user's credentials
    async function getUserCredentials(username) {
      console.log("getting credentials");
      const credentials = await JoblyApi.getCredentials(username);
      setUserCredentials(credentials);
    }

    // if signing in, use the user's token to get username, then load credentials
    if (userToken) {
      const decoded = jwt_decode(userToken);
      const username = decoded.username;
      getUserCredentials(username);
    }
  }, [userToken]);


  /** when a user logs in, request their token, put into local storage, and store in state */
  async function login(userData) {
    const token = await JoblyApi.getToken(userData);
    localStorage.setItem("joblyToken", JSON.stringify(token));
    setUserToken(() => token);
  }

  /** when a user logs out, set the token to an empty string */
  function logout() {
    localStorage.removeItem("joblyToken");
    setUserToken("");
    return (
      <Redirect to="/login" />
    );
  }

  /** when a user signs up, register, then store token */
  async function register(userData) {
    const token = await JoblyApi.register(userData);
    localStorage.setItem("joblyToken", JSON.stringify(token));
    setUserToken(() => token);
  }

  async function updateUser(userData) {
    const username = userData.username;
    delete userData.username;
    delete userData.password; // Do not send password to the server
    const updatedCredentials = JoblyApi.updateCredentials(username, userData);
    setUserCredentials(updatedCredentials);
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
        updateUser={updateUser}
        loggedIn={userToken}
        userCredentials={userCredentials}
      />
    </div>
  );
}

export default App;
