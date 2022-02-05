import React, { useReducer } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./Home";
import HomeAnon from "./HomeAnon";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import CompanyDetail from "./CompanyDetail";
import ProfileForm from "./ProfileForm";

const Routes = ({ companies, jobs, register, login, updateUser, apply, filter, clearFilter, applications, loggedIn, userCredentials, loginError, signupError, profileError }) => {

  return (
    <Switch>
      <Route exact path="/">
        {loggedIn
          ? <Home username={userCredentials.username} />
          : <HomeAnon />}
      </Route>
      <Route exact path="/companies">
        {loggedIn
          ? <CompanyList companies={companies} filter={filter} clearFilter={clearFilter} />
          : <Redirect to="/login" />}
      </Route>
      <Route exact path="/companies/:handle">
        {loggedIn
          ? <CompanyDetail companies={companies} jobs={jobs} apply={apply} applications={applications} />
          : <Redirect to="/login" />}
      </Route>
      <Route exact path="/jobs">
        {loggedIn
          ? <JobList jobs={jobs} apply={apply} applications={applications} />
          : <Redirect to="/login" />}
      </Route>
      <Route exact path="/profile">
        <ProfileForm
          updateUser={updateUser}
          username={userCredentials.username}
          firstName={userCredentials.firstName}
          lastName={userCredentials.lastName}
          email={userCredentials.email}
          error={profileError} />
      </Route>
      <Route exact path="/signup" >
        <SignupForm register={register} error={signupError} />
      </Route>
      <Route exact path="/login">
        <LoginForm login={login} error={loginError} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

}

export default Routes;