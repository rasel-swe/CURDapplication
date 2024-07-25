import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.style.css"; // Ensure this matches the actual file name

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            CRUD APP
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/" className="nav-link active" aria-current="page">
                CREATE
              </Link>
              <Link to="/read" className="nav-link">
                ALL POST
              </Link>
             
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
