import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Button } from "reactstrap"

const Home = ({ username }) => {
  return (
    <div className="Home shadow-lg">
      <h1>Welcome back,  {username}!</h1>
      <Link to="/jobs">
        <Button color="primary" size="lg" className="m-3">
          View Jobs
        </Button>
      </Link>
      <Link to="/companies">
        <Button color="primary" size="lg" className="m-3">
          View Companies
        </Button>
      </Link>
    </div >
  );
}

export default Home;