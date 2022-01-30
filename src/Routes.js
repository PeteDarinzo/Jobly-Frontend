import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import CompanyDetail from "./CompanyDetail";
import ProfileForm from "./ProfileForm";
import Logout from "./Logout";

const Routes = ({ companies, jobs, register, login, logout }) => {

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/companies">
        <CompanyList companies={companies} />
      </Route>
      <Route exact path="/companies/:handle">
        <CompanyDetail companies={companies} jobs={jobs} />
      </Route>
      <Route exact path="/jobs">
        <JobList jobs={jobs} />
      </Route>
      <Route exact path="/profile">
        <ProfileForm />
      </Route>
      <Route exact path="/signup" >
        <SignupForm register={register} />
      </Route>
      <Route exact path="/login">
        <LoginForm login={login} />
      </Route>
      <Route exact path="/logout">
        <Logout logout={logout} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

}

export default Routes;