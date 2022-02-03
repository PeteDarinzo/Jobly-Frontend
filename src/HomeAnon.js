import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Button } from "reactstrap"


/** Landing page for logged out users */

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
      <Link to="/login">
        <Button color="primary" size="lg" className="m-3">
          Log in
        </Button>
      </Link>
      <h2 className="Home-right">...just a click away.</h2>
    </div >
  );
}

export default HomeAnon;