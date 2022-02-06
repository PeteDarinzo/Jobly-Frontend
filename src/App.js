import './App.css';
import Routes from "./Routes"
import NavBar from './NavBar';
import React, { useState, useEffect, useRef, useCallback } from "react";
import JoblyApi from "./Api.js";
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';


function App() {

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [userCredentials, setUserCredentials] = useState({});
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [profileError, setProfileError] = useState("");


  /** 
   * On mount, query the JoblyApi for all company and job data, then save the result in state
   * Check local storage for a token, if one is present, set it as the current user token
  */

  useEffect(() => {

    async function getData() {
      let companiesRes = await JoblyApi.getAllCompanies();
      console.log("Companies res: ", companiesRes.companies);
      let jobsRes = await JoblyApi.getAllJobs();
      setCompanies(companiesRes);
      setJobs(jobsRes);
    }

    getData();

    if (localStorage.getItem("joblyToken")) {
      const token = JSON.parse(localStorage.getItem("joblyToken"));
      JoblyApi.token = token; // set JoblyApi token for future requests
      setUserToken(token);
    }
  }, []);


  /** 
   * When the user token changes (sign in, register, profile update, or browser refresh), load the user's credentials
   * Decode the userToken in state to get the current username, then query the API for that user's credentials
   * At this point, the user is successfully signed in, registered, or has updated their profile so clear any errors
   */

  useEffect(() => {

    async function loadCredentials() {
      const decoded = jwt_decode(userToken);
      const username = decoded.username;
      const credentials = await JoblyApi.getCredentials(username);
      setUserCredentials(credentials);
    }

    if (userToken) loadCredentials();

    setLoginError("");
    setSignupError("");
    setProfileError("");
  }, [userToken]);

  /** 
   * Only render the App when the three dependent sets of data are loaded
   * If the user is logged out, it is sufficient to only have jobs and companies loaded
   * If the user is logged in, jobs, companies, and the user's credentials must be loaded
   * There,fore, check for jobs, companies, and that user is logged out, or that companies are present
   * When all conditions are met, set loading state to false, which renders the main App
   */

  useEffect(() => {

    if (companies.length && jobs.length && (!userToken || Object.keys(userCredentials).length)) {
      setIsLoading(false);
    };
  }, [companies, jobs, userCredentials]);

  /** 
   * When a user logs in, request their token, put into local storage, and store in state
   * Storing the token in state triggers a query for the user's credentials
   * If an error is thrown during login, set it in state, it will be displayed on re-render
  */

  async function login(userData) {
    setIsLoading(true);
    try {
      const token = await JoblyApi.getToken(userData);
      localStorage.setItem("joblyToken", JSON.stringify(token));
      setUserToken(token);
      history.push("/");
    } catch (err) {
      setLoginError(err[0]);
      setIsLoading(false);
    }
  }

  /** 
   * when a user signs up, register, then store token in local storage and state
   * Storing the token in state triggers a query for the user's credentials
   * If an error is thrown during signup, set it in state, it will be displayed on re-render
  */

  async function register(userData) {
    try {
      setIsLoading(true);
      const token = await JoblyApi.register(userData);
      localStorage.setItem("joblyToken", JSON.stringify(token));
      setUserToken(token);
      history.push("/");
    } catch (err) {
      setSignupError(err[0]);
      setIsLoading(false);
    }
  }

  /** when a user logs out, set the token to an empty string, and redirect to login */

  function logout() {
    localStorage.removeItem("joblyToken");
    setUserToken("");
  }

  /** 
   * Verify user's password by requesting a token
   * If successful, post the new user credentials to the JoblyApi
   * Set the user's token in state to the token acquired during authorization, triggering a query to the JoblyApi to get the user's credentials, which includes job application data
   */

  async function updateUser(userData) {
    try {
      const token = await JoblyApi.getToken({ username: userData.username, password: userData.password });
      const username = userData.username;
      delete userData.username;
      delete userData.password; // Do not send password to the server
      await JoblyApi.updateCredentials(username, userData);
      setUserToken(token);
      history.push("/");
    } catch (err) {
      setProfileError(err[0]);
    }
  }

  /** 
   * Post the job id and applying username to the JoblyApi to apply
   * Next, request the usercredentials to get the updated application list
   */

  async function apply(id) {
    await JoblyApi.apply(userCredentials.username, id);
    const credentials = await JoblyApi.getCredentials(userCredentials.username);
    setUserCredentials(credentials);
  }

  /** 
   * Query the JoblyApi for a list of filtered companies
   * Set isLoading to avoid rendering before the request is answered
   * Set companies to the search results, this stop loading and render the result
   */

  async function filterCompanies(term) {
    setIsLoading(true);
    const searchRes = await JoblyApi.getAllCompanies({ name: term });
    setCompanies(searchRes);
  }

  /** Clear company filter */

  async function clearFilter() {
    setIsLoading(true);
    const searchRes = await JoblyApi.getAllCompanies();
    setCompanies(searchRes);
  }

  /** During times of data retrieval, just render a loading message */

  if (isLoading) {
    return (<p data-testid="loading">Loading...</p>);
  }

  return (
    <div className="App">
      <NavBar loggedIn={userToken} logout={logout} />
      <Routes
        companies={companies}
        jobs={jobs}
        register={register}
        login={login}
        updateUser={updateUser}
        apply={apply}
        filter={filterCompanies}
        clearFilter={clearFilter}
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
