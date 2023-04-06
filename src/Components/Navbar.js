import React from 'react';
import { NavLink } from 'react-router-dom';
import recipe from "../Images/recipe5.png"
function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            <img style={{height:"60px"}} src={recipe} alt="logo"/>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ContactUs">Contact us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/SignUp">Register</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
