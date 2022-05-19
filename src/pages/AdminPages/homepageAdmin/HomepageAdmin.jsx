import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import usercheck from "../../../assets/user-check.svg";
import userdata from "../../../assets/user-data.svg";
import userfollow from "../../../assets/user-follow.svg";
import { AuthContext } from "../../../auth/auth";

const HomepageAdmin = () => {
  const urlAuth = `${process.env.REACT_APP_API_URL}/api/user/auth`;
  //  const { setClientName } = useContext(UserInfosContext);
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    // setClientName("");
    axios
      .get(urlAuth, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          localStorage.setItem("user", JSON.stringify(res.data));
          setAuthState({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            role: res.data.role,
            image: res.data.image,
            id: res.data.id,
            status: true,
          });
        }
      });
  }, []);
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
            <h3>Gestion des annonces</h3>
            <p>Consulter la conformité des annonces en ligne</p>
          </Link>
        </div>
        <div className="block-menu">
          <Link to="/gererutilisateurs">
            <img src={userfollow} alt={userfollow} />
            <h3>Gestion des utilisateurs</h3>
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
