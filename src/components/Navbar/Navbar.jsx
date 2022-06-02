import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/auth";
import logout from "../../assets/logout.svg";
import tools from "../../assets/tools.svg";

const Navbar = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [showLinks, setShowLinks] = useState(false);
  const navigate = useNavigate();
  console.log("authState.role :>> ", authState);
  console.log("authState.image :>> ", authState.image);

  const logOut = () => {
    setAuthState({ ...authState, status: false });
    localStorage.clear();
    window.location.reload();
    navigate("/", { replace: true });
    console.log("je veux voir authState :>> ", authState);
  };

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  console.log(showLinks);
  return (
    <nav className="navbar">
      {/* <section className="container-navbar"> */}
      <div className="nav-first-part">
        <div className="div-logo">
          <Link to="/">
            <img src={logo} alt={logo} />
          </Link>
        </div>
        <ul className={`${showLinks ? "show-nav" : "nav-links"}`}>
          <li>
            <NavLink to="/annonces">ANNONCES</NavLink>
          </li>
          <li>
            <NavLink to="/faq">FAQ</NavLink>
          </li>
          {authState.role === "client" ? (
            <li>
              <NavLink to="/mesAnnonces/:id">MES ANNONCES</NavLink>
            </li>
          ) : (
            ""
          )}
          {authState.role === "admin" ? (
            <nav>
              <li>
                <NavLink to="/gererannonces">ANNONCES</NavLink>
              </li>
              <li>
                <NavLink to="/gererutilisateurs">UTILISATEURS</NavLink>
              </li>
            </nav>
          ) : (
            ""
          )}
        </ul>
      </div>
      {/* <NavLink>Annonces</NavLink>
        <NavLink>Annonces</NavLink> */}
      <div className="nav-second-part">
        {authState.role === "client" || authState.role === "admin" ? (
          <div className="user-login">
            <div className="profil">
              <img src={authState.image} alt="img-client" />
              <div className="div-name-email">
                <p>{authState.firstName}</p>
                <span>{authState.email}</span>
              </div>
            </div>
            {/* <div className="div-myaccount">
                    <NavLink to="/moncompte">
                      <img src={tools} alt={tools} />
                    </NavLink>
                  </div> */}
            <div className="div-logout">
              <img src={logout} alt={logout} onClick={logOut} />
            </div>
          </div>
        ) : (
          <div className="nav-compte">
            <NavLink to="/connexion">CONNEXION</NavLink>
            <NavLink to="/senrengistrer">CRÉER UN COMPTE</NavLink>
          </div>
        )}
        <button className="navbar__burger" onClick={handleShowLinks}>
          <span className="burger-bar"></span>
        </button>
      </div>

      {/* </section> */}
    </nav>
  );
};

export default Navbar;
