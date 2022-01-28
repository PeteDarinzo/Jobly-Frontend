import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import CompanyDetail from "./CompanyDetail";
import ProfileForm from "./ProfileForm";

const Routes = ({ companies, jobs }) => {

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
      <Route exact path="/signup">
        <SignupForm />
      </Route>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

}

export default Routes;