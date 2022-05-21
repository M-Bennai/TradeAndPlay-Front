import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../auth/auth";
import { useNavigate } from "react-router-dom";

const MesAnnonces = () => {
  const { authState } = useContext(AuthContext);

  const id = authState.id;

  const [myArticles, setMyArticles] = useState([]);
  const navigate = useNavigate();

  console.log("clientId :>> ", id);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/article/all/${id}`)
      .then((res) => {
        console.log("res.data :>> ", res.data.allArticleByUser);

        setMyArticles(res.data.allArticleByUser);
        console.log("myArticle :>> ", myArticles);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  const deleteArticle = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/article/delete/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log("res.data :>> ", res.data);
        console.log(`l'elment a bien été suppri`);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };
  return (
    <section className="section-mes-annonces">
      <h1>Mes annonces</h1>
      <div className="my-articles-container">
        <div>
          <button
            className="btn-create-article"
            onClick={() => navigate("/creeruneannonce", { replace: true })}
          >
            + Creer une annonce
          </button>
        </div>{" "}
        {myArticles.map((el) => {
          const { id, title, image, ageRange } = el;
          console.log("lets check the id " + id);
          const goToArticleDetails = (id) => {
            navigate(`/annonces/${id}`);
          };
          return (
            <div key={id} className="block-article">
              <div className="article-img">
                <figure>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${image}`}
                    alt={title}
                  />
                </figure>
              </div>
              <div className="info-article">
                <h3>{title}</h3>
                <span>{ageRange}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteArticle(id)}
                >
                  supprimer mon article
                </button>
                <button
                  className="update-btn"
                  onClick={() => deleteArticle(id)}
                >
                  modifier mon article
                </button>
                <button onClick={() => goToArticleDetails(id)}>
                  Voir Annonce
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MesAnnonces;
