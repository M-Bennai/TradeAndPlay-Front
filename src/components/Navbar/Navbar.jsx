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
          <NavLink to={authState.role === "client" ? "/annonces" : ""}>
            Annonces
          </NavLink>
          <NavLink to="/mesAnnonces">Mes annonces</NavLink>
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
