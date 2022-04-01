import React from "react";
import logo from "../../assets/logo.svg";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-first-part">
        <div className="div-logo">
          <Link to="/">
            <span>Trade and Play</span>
            <img src={logo} alt={logo} />
          </Link>
        </div>
        <div className="nav-links">
          <NavLink to="/annonces">Annonces</NavLink>
          <p>Annonces</p>
          <p>Annonces</p>
          {/* <NavLink>Annonces</NavLink>
        <NavLink>Annonces</NavLink> */}
        </div>
      </div>
      <div className="nav-second-part">
        <div className="nav-compte">
          <NavLink to="/connexion">Connexion</NavLink>
          <NavLink to="/senrengistrer">Créer un compte</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
