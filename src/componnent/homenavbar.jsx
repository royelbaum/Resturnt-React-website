import React from "react";
import { Link, NavLink } from "react-router-dom";

const HomeNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        TastEat
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/Login">
           Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/Signup">
           Signup
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavBar;
