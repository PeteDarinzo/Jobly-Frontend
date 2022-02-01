import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Button } from "reactstrap"

const HomeAnon = () => {
  return (
    <div className="Home shadow-lg">
      <h1>Welcome to Jobly!</h1>
      <h2 className="Home-left">Your dream job...</h2>
      <Link to="/signup">
        <Button color="primary" size="lg" className="m-3">
          Sign Up
        </Button>
      </Link>
      {/* <Button color="primary" size="lg" className="m-3">
        <Link to="/jobs" className="HomeLink" style={{ textDecoration: "none", color: "white" }}>View Jobs</Link>
      </Button> */}
      <Link to="/login">
        <Button color="primary" size="lg" className="m-3">
          Log in
        </Button>
      </Link>
      {/* <Button color="primary" size="lg" className="m-3">
        <Link to="/companies" style={{ textDecoration: "none", color: "white" }}>View Companies</Link>
      </Button> */}
      <h2 className="Home-right">...just a click away.</h2>
    </div >
  );
}

export default HomeAnon;