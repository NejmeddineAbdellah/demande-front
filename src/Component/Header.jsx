// Header.js

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignOutAlt } from 'react-icons/fa'; 
import authService from '../services/auth.service';

const Header = () => {
  const navigate = useNavigate();
  const rolesString = localStorage.getItem('role');
  const isAdmin = rolesString.includes('ROLE_ADMIN');
  const isUser = rolesString.includes('ROLE_USER') && !isAdmin;

  const logout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Demande Managment
        </Link>

        <div className="collapse navbar-collapse me-auto">
          <ul className="navbar-nav">
            {isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/ListDemande">
                  Demandes
                </NavLink>
              </li>
            )}
            {isUser && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/ListUserDemande">
                  Mes demandes
                </NavLink>
              </li>
            )}
            {isUser && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/CreateDemande">
                  Add demande
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="ms-auto">
          {rolesString && (
            <button className="btn btn-outline-light" onClick={logout}>
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
