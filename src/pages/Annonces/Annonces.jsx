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
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return (
    <section className="article-page">
      <h1>Annonces en ligne</h1>
      <div className="grid-article">
        {articles.map((el) => {
          const { id, title, image, ageRange } = el;
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
                <img src={image} alt={title} />
              </figure>
              <div className="info-article">
                <h3>{title}</h3>
                <span>{ageRange}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Annonces;
