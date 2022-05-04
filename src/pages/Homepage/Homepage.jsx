import React, { useContext, useEffect } from "react";
import box from "../../assets/box.svg";
import wave from "../../assets/homepage-waves.svg";
import earth from "../../assets/earth.svg";
import toysbox from "../../assets/toysbox.svg";
import budget from "../../assets/budget.svg";
import { AuthContext } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserInfosContext } from "../../context/UserInfosContext";

const Homepage = () => {
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
    <section className="homepage">
      <div className="container-banner">
        <div className="banner-left">
          <h1>Trade & Play</h1>
          <h2>Echangez vos jouets inutilisés</h2>
          <p>
            Aider les parents à désencombrer, donner de la joie et sauver la
            planète...
          </p>
        </div>
        <div className="banner-right">
          <img src={box} alt={box} />
        </div>
      </div>
      <div className="homepage-2nd-screen">
        <img className="wave-svg" src={wave} alt={wave} />
        <div className="homepage-description">
          <div className="description-block">
            <aside>
              <img src={earth} alt={earth} />
            </aside>
            <article>
              <h3>40 millions</h3>
              <p>
                de jouets jetés chaque année. Les jouets aussi ont une fin de
                vie : ils finissent dans les armoires ou à la poubelle. 1,27
                sont jetés chaque seconde en France.
              </p>
            </article>
          </div>
          <div className="description-block">
            <article>
              <h3>Quelques mois</h3>
              <p>
                C’est la durée de vie, en moyenne d’un jouet avant que l’enfant
                s’en désintéresse. Camion, poupée, puzzle, boîte à musique,
                peluches, livres, très vite, une question se pose : que faire de
                ces jeux et jouets qui restent au fond d’un placard ? Doit-on
                les jeter, les recycler, les donner ?
              </p>
            </article>
            <aside>
              <img src={toysbox} alt={toysbox} />
            </aside>
          </div>
          <div className="description-block">
            <aside>
              <img src={budget} alt={budget} />
            </aside>
            <article>
              <h3>237€</h3>
              <p>
                C’est le budget moyen à l'achat de jeux et de jouets au cours de
                l'année, cette moyenne grimpe fort logiquement avec le nombre
                d'enfants présents dans le foyer, passant de 170€ dans un foyer
                sans enfant à 258€ pour une famille avec deux enfants et 463€
                pour un foyer avec quatre enfants ou plus.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
