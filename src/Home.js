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
      {/* <Button color="primary" size="lg" className="m-3">
        <Link to="/jobs" className="HomeLink" style={{ textDecoration: "none", color: "white" }}>View Jobs</Link>
      </Button> */}
      <Link to="/companies">
        <Button color="primary" size="lg" className="m-3">
          View Companies
        </Button>
      </Link>
      {/* <Button color="primary" size="lg" className="m-3">
        <Link to="/companies" style={{ textDecoration: "none", color: "white" }}>View Companies</Link>
      </Button> */}
    </div >
  );
}

export default Home;