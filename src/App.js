import './App.css';
import Routes from "./Routes"
import NavBar from './NavBar';
import React, { useState, useEffect } from "react";
import JoblyApi from "./Api.js";
import jwt_decode from "jwt-decode";
import { Redirect, useHistory } from 'react-router-dom';

function App() {

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [userCredentials, setUserCredentials] = useState({});

  /** On mount, request all company and job from JoblyApi
   *  Check local storage for a user token
   * if present, set it as userToken in state
   * this will cause the user's credentials to be loaded
   */
  useEffect(() => {

    async function getData() {
      let companies = await JoblyApi.getAllCompanies();
      let jobs = await JoblyApi.getAllJobs();
      setCompanies(companies);
      setJobs(jobs);
    }

    function loadUserToken() {
      if (localStorage.getItem("joblyToken") === null) {
        localStorage.setItem("joblyToken", JSON.stringify(""));
      } else {
        const token = JSON.parse(localStorage.getItem("joblyToken"));
        JoblyApi.token = token; // set API token on refresh
        setUserToken(token);
      }
    }

    getData();
    loadUserToken();

  }, []);

  /** When the user token changes (signin or browser refresh), load the user's credentials
   * Decode the userToken in state to get the current username, then query the API for that user's credentials
   */
  useEffect(() => {
    async function loadCredentials() {
      const decoded = jwt_decode(userToken);
      const username = decoded.username;
      const credentials = await JoblyApi.getCredentials(username);
      setUserCredentials(credentials);
    }
    // make sure that the user is logged in, logging out will also cause a token change
    if (userToken) loadCredentials();
    setIsLoading(false); // once all data (job, company, token, credentials) is loaded, render the home page
  }, [userToken]);


  /** when a user logs in, request their token, put into local storage, and store in state */
  async function login(userData) {
    setIsLoading(true);
    const token = await JoblyApi.getToken(userData);
    localStorage.setItem("joblyToken", JSON.stringify(token));
    setUserToken(() => token);

  }

  /** when a user logs out, set the token to an empty string, and redirect to login */
  function logout() {
    localStorage.removeItem("joblyToken");
    setUserToken("");
    return (
      <Redirect to="/login" />
    );
  }

  /** when a user signs up, register, then store token in local storage and state */
  async function register(userData) {
    setIsLoading(true);
    const token = await JoblyApi.register(userData);
    localStorage.setItem("joblyToken", JSON.stringify(token));
    setUserToken(() => token);
  }

  /** verify user's password by requesting a token
   * if successful, post the new user credentials to the server
   * set the user token in state to the token acquired during authorization
   * this will cause trigger the useEffect to get the users credentials, which includes job application data
   */
  async function updateUser(userData) {
    const token = await JoblyApi.getToken({ username: userData.username, password: userData.password });
    if (token) {
      const username = userData.username;
      delete userData.username;
      delete userData.password; // Do not send password to the server
      await JoblyApi.updateCredentials(username, userData);
      setUserToken(token);
    } else {
      console.log("Wrong password");
      return (
        <Redirect to="/profile" />
      );
    }
  }

  async function apply(id) {
    await JoblyApi.apply(userCredentials.username, id);
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
        apply={apply}
        applications={userCredentials.applications}
        loggedIn={userToken}
        userCredentials={userCredentials}
      />
    </div>
  );
}

export default App;
