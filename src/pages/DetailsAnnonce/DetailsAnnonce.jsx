import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserInfosContext } from "../../context/UserInfosContext";
import { format } from "date-fns";

const DetailsAnnonce = () => {
  const { id } = useParams();
  const [article, setArticle] = useState("");
  const [user, setUser] = useState("");

  console.log("id :>> ", id);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/article/oneArticle/${id}`)
      .then((res) => {
        console.log("res.data :>> ", res.data.oneArticle.user);
        setArticle(res.data.oneArticle);
        setUser(res.data.oneArticle.user);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return (
    <section className="section-details">
      <div className="container-article-page">
        <figure className="article-img">
          <img src={article.image} alt={article.title} />
        </figure>
        <div className="container-article-details">
          <h1>{article.title}</h1>
          <div className="article-tags">
            <span>ADD ARTICLE CATEGORY</span>
            <span className="span-condition">Etat : {article.condition}</span>
          </div>
          <div className="container-upper-details">
            <div className="article-details">
              <p>Mise en ligne par {user.firstName}</p>
              <span>{article.ageRange}</span>
            </div>
            <div className="article-date">
              <span>ADD CITY HERE</span>
              <span>{article.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>Description</h3>
        <p>{article.description}</p>
      </div>
    </section>
  );
};

export default DetailsAnnonce;
