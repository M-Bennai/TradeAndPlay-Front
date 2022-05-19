import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Annonces = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/article/all`)
      .then((res) => {
        console.log("res.data :>> ", res.data.allArticle);
        setArticles(res.data.allArticle);
        console.log("je veux voir mon image :>> ", res.data.allArticle.image);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return (
    <section className="article-page">
      <div className="container-article">
        <h1>Annonces en ligne</h1>
        <div className="grid-article">
          {articles.map((el) => {
            const { id, title, image, ageRange } = el;
            console.log("i wanna see" + image);
            const goToArticleDetails = (id) => {
              navigate(`/annonces/${id}`);
            };
            return (
              <div
                key={id}
                onClick={() => goToArticleDetails(id)}
                className="block-article"
              >
                <figure>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${image}`}
                    alt={title}
                  />
                </figure>
                <div className="info-article">
                  <h3>{title}</h3>
                  <span>{ageRange}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Annonces;
