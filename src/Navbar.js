import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {

  return (
    <nav>
      <NavLink to="/">
        Jobly
      </NavLink>
      <NavLink to="/companies">
        Companies
      </NavLink>
      <NavLink to="/jobs">
        Jobs
      </NavLink>
      <NavLink to="/profile">
        Profile
      </NavLink>
      <NavLink to="/login">
        Login
      </NavLink>
      <NavLink to="/signup">
        Signup
      </NavLink>
    </nav>
  );
}

export default Navbar;