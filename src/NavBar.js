import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"
import { Navbar, Nav, NavItem } from "reactstrap";

const NavBar = ({ loggedIn, logout }) => {

  return (
    <div>
      <Navbar className="py-3">
        <NavLink exact to="/" className="Nav-logo">
          Jobly <span className="material-icons">work</span>
        </NavLink>
        {loggedIn && (
          <Nav>
            <NavItem>
              <NavLink to="/companies">
                Companies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/jobs">
                Jobs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile">
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login" onClick={logout}>
                Log Out
              </NavLink>
            </NavItem>
          </Nav>
        )}
        {!loggedIn && (<Nav>
          <NavItem>
            <NavLink to="/login">
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signup">
              Signup
            </NavLink>
          </NavItem>
        </Nav>)}
      </Navbar>
    </div >

  );
}

export default NavBar;