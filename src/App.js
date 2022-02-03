import './App.css';
import Routes from "./Routes"
import NavBar from './NavBar';
import React, { useState, useEffect, useRef, useCallback } from "react";
import JoblyApi from "./Api.js";
import jwt_decode from "jwt-decode";
import { Redirect, useHistory } from 'react-router-dom';
import { useReducer } from 'react/cjs/react.development';

function App() {

  const history = useHistory();
  const isMounted = useRef(false);
  const credsLoaded = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [userCredentials, setUserCredentials] = useState({});
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [profileError, setProfileError] = useState("");

  /** On mount, request all company and job from JoblyApi
   *  Check local storage for a user token
   * if present, set it as userToken in state
   * this will cause the user's credentials to be loaded
   */
  useEffect(() => {
    setIsLoading(true);
    console.log("LOADING TOKEN");
    if (localStorage.getItem("joblyToken") === null) {
      localStorage.setItem("joblyToken", JSON.stringify(""));
    } else {
      const token = JSON.parse(localStorage.getItem("joblyToken"));
      JoblyApi.token = token; // set API token
      setUserToken(token);
    }
    isMounted.current = true;
  }, []);


  /** When the user token changes (signin or browser refresh), load the user's credentials
   * Decode the userToken in state to get the current username, then query the API for that user's credentials
   */
  useEffect(() => {
    async function loadCredentials() {
      console.log("LOADING CREDENTIALS")
      const decoded = jwt_decode(userToken);
      const username = decoded.username;
      const credentials = await JoblyApi.getCredentials(username);
      setUserCredentials(credentials);
      credsLoaded.current = true;
    }
    if (userToken) loadCredentials();
  }, [userToken]);


  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      console.log("LOADING DATA");
      let joblyCompanies = await JoblyApi.getAllCompanies();
      let joblyJobs = await JoblyApi.getAllJobs();
      setJobs(jobs => joblyJobs);
      setCompanies(companies => joblyCompanies);
    }
    if (credsLoaded.current && isMounted.current) {
      console.log("fetching data");
      getData();
      console.log("data loaded");
    }
    // setIsLoading(false); // once all data (job, company, token, credentials) is loaded, render the home page  
  }, [userCredentials]);



  useEffect(() => {
    if (companies) {
      setIsLoading(false);
    }
  }, [companies]);


  /** when a user logs in, request their token, put into local storage, and store in state */
  async function login(userData) {
    setIsLoading(true);
    try {
      const token = await JoblyApi.getToken(userData);
      localStorage.setItem("joblyToken", JSON.stringify(token));
      setUserToken(() => token);
      history.push("/");
    } catch (err) {
      setLoginError(err[0]);
      setIsLoading(false);
    }
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
    try {
      setIsLoading(true);
      const token = await JoblyApi.register(userData);
      localStorage.setItem("joblyToken", JSON.stringify(token));
      setUserToken(() => token);
      history.push("/");
    } catch (err) {
      setSignupError(err[0]);
      setIsLoading(false);
    }
  }

  /** verify user's password by requesting a token
   * if successful, post the new user credentials to the server
   * set the user token in state to the token acquired during authorization
   * this will cause trigger the useEffect to get the users credentials, which includes job application data
   */
  async function updateUser(userData) {
    try {
      const token = await JoblyApi.getToken({ username: userData.username, password: userData.password });
      const username = userData.username;
      delete userData.username;
      delete userData.password; // Do not send password to the server
      await JoblyApi.updateCredentials(username, userData);
      setUserToken(token); // trigger a rerender
      history.push("/");
    } catch (err) {
      setProfileError(err[0]);
    }
  }

  async function apply(id) {
    await JoblyApi.apply(userCredentials.username, id);
  }

  async function filterCompanies(term) {
    setIsLoading(true);
    console.log("filtering");
    const searchRes = await JoblyApi.getAllCompanies({ name: term });
    console.log(searchRes);
    setCompanies(searchRes);
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
        filter={filterCompanies}
        applications={userCredentials.applications}
        loggedIn={userToken}
        userCredentials={userCredentials}
        loginError={loginError}
        signupError={signupError}
        profileError={profileError}
      />
    </div>
  );
}

export default App;
