import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserInfosContext } from "../../context/UserInfosContext";
import { format } from "date-fns";
import Select from "react-select";

const DetailsAnnonce = () => {
  const { id } = useParams();
  const [article, setArticle] = useState("");
  const [imageArticle, setImageArticle] = useState("");
  const [user, setUser] = useState("");

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted #F6F6F6",
      color: state.isSelected ? "#6935d7" : "black",
      padding: 20,
      background: "white",
      borderRadius: "0.625rem",
      "&:hover": {
        background: "#F6F6F6",
      },
    }),

    indicatorSeparator: () => ({
      border: "none",
    }),

    indicatorsContainer: () => ({
      borderLeft: "1px solid #f1f1f1",
      padding: "10px",
      marginRight: "2px",
      cursor: "pointer",
    }),

    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      width: 312,
      height: 57,
      backgroundColor: "white",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  console.log("id :>> ", id);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/article/oneArticle/${id}`)
      .then((res) => {
        console.log("res.data :>> ", res.data.oneArticle.user);
        setArticle(res.data.oneArticle);
        setImageArticle(res.data.oneArticle.image);
        setUser(res.data.oneArticle.user);
        console.log("image article :>> ", res.data.oneArticle.image);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return (
    <section className="section-details">
      <div className="container-article-page">
        <figure className="article-img">
          <img
            src={`${process.env.REACT_APP_API_URL}/${imageArticle}`}
            alt={article.title}
          />
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
          <div>
            <h3>Description</h3>
            <p>{article.description}</p>
          </div>
          <div>
            <label htmlFor="type">Valeur</label>
            <Select
              className="select-toys"
              styles={customStyles}
              placeholder="Mes jouets"
              name="myToys"
            />
            <button className="button">Proposer un échange</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsAnnonce;
