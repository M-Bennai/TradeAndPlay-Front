import React from "react";
import logo from "../../assets/logo.svg";
import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../auth/auth";

const Navbar = () => {
  const { authState } = useContext(AuthContext);
  console.log("authState.role :>> ", authState);
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
          {authState.role === "client" ? (
            <NavLink to="/mesAnnonces/:id">Mes annonces</NavLink>
          ) : (
            ""
          )}

          {/* <NavLink>Annonces</NavLink>
        <NavLink>Annonces</NavLink> */}
        </div>
      </div>
      <div className="nav-second-part">
        {authState.role === "client" ? (
          <div>
            <NavLink to="/moncompte">
              <img
                className="profil-img-navbar"
                src={authState.image}
                alt="img-client"
              />
            </NavLink>
          </div>
        ) : (
          <div className="nav-compte">
            <NavLink to="/connexion">Connexion</NavLink>
            <NavLink to="/senrengistrer">Créer un compte</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
