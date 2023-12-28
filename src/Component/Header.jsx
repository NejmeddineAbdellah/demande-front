// Header.js

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Logo</Link>

        {/* Utilisation de la classe "me-auto" pour aligner les liens au centre */}
        <div className="collapse navbar-collapse me-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/ListDemande">
                Demandes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ListUserDemande">
                Mes demandes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/CreateDemande">
                Add demande
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Utilisation de la classe "ms-auto" pour aligner le bouton de déconnexion à droite */}
        <div className="ms-auto">
          {/* Vous devrez remplacer ce bouton par votre bouton de déconnexion */}
            Logout
        </div>
      </div>
    </nav>
  );
};

export default Header;
