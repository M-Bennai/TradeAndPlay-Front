import React from "react";
import { Link } from "react-router-dom";
import usercheck from "../../../assets/user-check.svg";
import userdata from "../../../assets/user-data.svg";
import userfollow from "../../../assets/user-follow.svg";

const HomepageAdmin = () => {
  return (
    <section className="section-homepage-admin">
      <h1>Bienvenue sur votre espace administrateur</h1>
      <h2>
        L’espace administrateur vous permet de gérer les annonces les
        utilisateurs et annonces.
      </h2>
      <div className="grid-menu-admin">
        <div className="block-menu">
          <Link to="/gererannonces">
            <img src={usercheck} alt={usercheck} />
            <h3>Gérer les annonces</h3>
            <p>Consulter la conformité des annonces en ligne</p>
          </Link>
        </div>
        <div className="block-menu">
          <Link to="/gererutilisateurs">
            <img src={userfollow} alt={userfollow} />
            <h3>Gérer les utilisateurs</h3>
            <p>Consulter la conformité des utilisateurs</p>
          </Link>
        </div>
        <div className="block-menu">
          <Link to="/parametres/:id">
            <img src={userdata} alt={userdata} />
            <h3>Mes parametres</h3>
            <p>Gérer votre compte administrateur</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomepageAdmin;
