import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Annonces = () => {
  const [articles, setArticles] = useState([]);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [ageRange, setAgeRange] = useState("");
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
        <div className="div-search">
          <input className="search-input" placeholder="Recherche annonces" />
        </div>
        <div className="grid-article">
          {articles.map((el) => {
            const { id, title, image, value, category, ageRange } = el;
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
                  <img src={image} alt={title} />
                </figure>
                <div className="info-article">
                  <div className="div-agerange-value">
                    <h3>{title}</h3>
                    <p className="p-value">Catégorie {value.name}</p>
                  </div>
                  <div className="div-agerange-value">
                    <p className="p-category">{category.name}</p>

                    <p className="p-range">● {ageRange.range}</p>
                  </div>
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
