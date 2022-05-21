import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserInfosContext } from "../../context/UserInfosContext";
import { format } from "date-fns";
import Select from "react-select";
import { AuthContext } from "../../auth/auth";

const DetailsAnnonce = () => {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [article, setArticle] = useState("");
  const [imageArticle, setImageArticle] = useState("");
  const [user, setUser] = useState("");
  const [selectToys, setSelectToys] = useState(false);
  const [userArticlesFromAPI, setUserArticlesFromAPI] = useState();
  const [articleToExchange, setArticleToExchange] = useState([
    {
      name: "",
      id: "",
    },
  ]);

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

  useEffect(() => {
    const selectToys = document.getElementById("select-toys");
    const btn = document.getElementById("modal-exchange");
    if (!selectToys === "exchange") {
      const btn = document.getElementById("modal-exchange");

      btn.classList.remove("btn-next-active");
    } else {
      btn.classList.add("btn-next-active");
    }
  }, [selectToys]);

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
  console.log("i wanna see this bro :>> ", article);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/article/all/${authState.id}`)
      .then((res) => {
        setUserArticlesFromAPI(res.data.allArticleByUser);
        console.log("allArticleByUser :>> ", res.data.allArticleByUser);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  // const handleArticleToExchange = (obj, index) => {
  //   console.log("obj :>> ", obj);
  //   const { name, value, id } = obj;
  //   const list = [...articleToExchange];
  //   list[index][name] = value;
  //   // list[index]["id"] = id;
  //   console.log('list[index]["id"] = id; :>> ', (list[index]["id"] = id));
  //   setArticleToExchange(list);
  //   console.log("articleToExchange :>> ", articleToExchange);
  //   // setValueId(obj.id);
  //   console.log("article to exchange id here:>> ", obj.id);
  // };
  const handle = () => {
    setArticleToExchange(true);
  };

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
          {articleToExchange.map((el, index) => {
            const option =
              userArticlesFromAPI &&
              userArticlesFromAPI.map((el) => {
                if (article.valueId === el.valueId) {
                  console.log("lets compare with wesh " + article.valueId);
                  console.log("wesh wesh" + el.valueId);

                  return {
                    value: el.title,
                    label: el.title + ` peut être échangé`,
                    name: "articleToExchange",
                    id: el.valueId,
                  };
                } else {
                  return "";
                }
              });
            return (
              <div key={index}>
                <Select
                  className="select-toys"
                  options={option}
                  styles={customStyles}
                  // onChange={(obj) => handleArticleToExchange(obj, index)}

                  placeholder="Mes jouets"
                  name="articleToExchange"
                  id="select-toys"
                />
              </div>
            );
          })}
          <button className="button-inactive" id="modal-exchange">
            Proposer un échange
          </button>
        </div>
      </div>
    </section>
  );
};

export default DetailsAnnonce;
