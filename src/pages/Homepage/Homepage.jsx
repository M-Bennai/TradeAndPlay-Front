import React, { useContext, useEffect } from "react";
import box from "../../assets/box.svg";
import wave from "../../assets/homepage-waves.svg";
import wavedown from "../../assets/down-banner.svg";
import upperblue from "../../assets/upper-blue.svg";
import downblue from "../../assets/down-blue.svg";
import earth from "../../assets/earth.svg";
import child from "../../assets/child-playing.svg";
import toysbox from "../../assets/toysbox.svg";
import budget from "../../assets/budget.svg";
import { AuthContext } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserInfosContext } from "../../context/UserInfosContext";

const Homepage = () => {
  const urlAuth = `${process.env.REACT_APP_API_URL}/api/user/auth`;
  //const { setClientName, setImage, setFirstName, setLastName, setEmail } = useContext(UserInfosContext);
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
          console.log("res.data :>> ", res.data);
          console.log("res.data.image :>> ", res.data.image);
          localStorage.setItem("user", JSON.stringify(res.data));
          setAuthState({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
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
        <img className="wave-svg" src={wavedown} alt={wavedown} />

        <div className="our-mission">
          <div className="description-block">
            <h1>Notre mission</h1>
            <p>
              “Faire de l’échange de jouets l’option incontournable est une
              priorité pour nous car cela profite à tout le monde. Nous voulons
              aider les gens à économiser de l’argent et à désencombrer sans se
              sentir coupables de voir leurs articles mis en décharge”
            </p>
          </div>
        </div>
      </div>
      <div className="homepage-3rd-screen">
        <img src={upperblue} alt={upperblue} />
        <div className="homepage-description-third">
          <div className="description-block">
            <h2>Consulter les annonces et proposez un échange</h2>
            <h3>
              Les jouets sont trié par catégorie d’âge et de prix afin de
              proposer un échange simple et équitable.
            </h3>
            <p>
              Si un jouet vous intéresse et que vous avez un jouet de la même
              catégorie a échanger, vous pouvez proposer un échange.
            </p>
          </div>
        </div>
        <img src={downblue} alt={downblue} />
      </div>
      <div className="homepage-4th-screen">
        <div className="description-block">
          <h4>Creer une annonce</h4>
          <p>
            Pour être accepté, ton objet doit être en bon état. Choisis donc
            avec soin quels objets tu souhaites échanger, et suit les étapes du
            questionnaire d’échange. Crée ton compte et renseigne tes
            informations.
          </p>
          <p>
            L’offre de reprise est limitée aux personnes âgées de 18 ans et
            plus. Ce sont donc les parents qui décident d’échanger les objets
            ludo-éducatifs de leur famille et gèrent les échanges.
          </p>
          <p>
            Tous les produits doivent être propres, complets, ou s’ils sont
            incomplets alors encore jouable, en bon état de fonctionnement.
            N’échange pas un objet que tu ne souhaiterais pas toi-même recevoir
            en cadeau.
          </p>
          <img src={child} alt={child} />
        </div>
      </div>
    </section>
  );
};

export default Homepage;
