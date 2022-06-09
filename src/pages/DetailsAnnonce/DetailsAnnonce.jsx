import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useParams } from "react-router-dom";
import { UserInfosContext } from "../../context/UserInfosContext";
import { format } from "date-fns";
import Select from "react-select";
import { AuthContext } from "../../auth/auth";
import Modal from "react-modal";

const DetailsAnnonce = () => {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [article, setArticle] = useState("");
  const [imageArticle, setImageArticle] = useState("");
  const [user, setUser] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [selectToys, setSelectToys] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  //const [showButton, setShowButton] = useState(true);
  const [userArticlesFromAPI, setUserArticlesFromAPI] = useState();
  const [articleToExchange, setArticleToExchange] = useState([
    {
      name: "",
      id: "",
    },
  ]);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

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

  const customStyleModal = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "auto",
      width: "55rem",
      padding: "0rem",
      borderRadius: "10px",
    },
  };

  // useEffect(() => {
  //   const selectToys = document.getElementById("select-toys");
  //   const btn = document.getElementById("modal-exchange");
  //   if (!selectToys === "exchange") {
  //     const btn = document.getElementById("modal-exchange");

  //     btn.classList.remove("btn-next-active");
  //   } else {
  //     btn.classList.add("btn-next-active");
  //   }
  // }, [selectToys]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/article/oneArticle/${id}`)
      .then((res) => {
        console.log("res.data :>> ", res.data.oneArticle.user);

        setArticle(res.data.oneArticle);
        setImageArticle(res.data.oneArticle.image);
        setUser(res.data.oneArticle.user);
        setValue(res.data.oneArticle.value);
        setAgeRange(res.data.oneArticle.ageRange);
        setCategory(res.data.oneArticle.category);
        console.log(" VALUE PLEASE :>> ", res.data.oneArticle.value);
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
  const handleArticleToExchange = (obj) => {
    const btn = document.getElementById("modal-exchange");
    if (article.valueId === obj.id) {
      btn.classList.add("btn-next-active");
      btn.disable = false;
    } else {
      btn.classList.remove("btn-next-active");
      btn.disable = true;
    }
    console.log("article. :>> ", article.valueId);
    console.log("userArticlesFromAPI.valuedId :>> ", articleToExchange.valueId);
    // console.log("voir option.id:>> ", option.id);
    // console.log("option :>> ", option);
    //console.log("index :>> ", index);
    console.log("obj :>> ", obj.id);
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_m4cvua9",
        "template_3yzmg9n",
        form.current,
        "mb49EuwWXV5NSDRP-"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  console.log("user.city :>> ", user.address);
  return (
    <section className="section-details">
      <h1 className="title-article">{article.title}</h1>
      <div className="container-article-page">
        <figure className="article-img">
          <img src={imageArticle} alt={article.title} />
        </figure>
        <div className="container-article-details">
          <div className="container-user-details">
            <div className="img-and-user-details">
              <img src={user.image} alt={user.firstName} />
              <div className="user-details">
                <p>Mise en ligne par </p>
                <span className="user-name">{user.firstName}</span>
              </div>
            </div>
            <div className="div-user-city">
              <span>📍 {user.city}</span>
            </div>
          </div>
          <div className="container-article-description">
            <div className="article-tags">
              <span className="span-value">Catégorie {value.name}</span>
              <span className="span-condition">Etat : {article.condition}</span>
            </div>
            <div className="container-upper-details">
              <div className="article-details">
                <span className="span-agerange">● {ageRange.range}</span>
              </div>
              <div className="article-date">
                <span>{article.createdAt}</span>
              </div>
            </div>
            <div className="div-description">
              <h3>Description</h3>
              <p>{article.description}</p>
            </div>

            <h4>Proposer un échange</h4>
            {authState.role === "client" ? (
              <div>
                {articleToExchange.map((el, index) => {
                  //const btn = document.getElementById("modal-exchange");
                  console.log("jveux voir el", el);
                  let valueId;
                  const option =
                    userArticlesFromAPI &&
                    userArticlesFromAPI.map((el) => {
                      //if (article.valueId === el.valueId) {
                      console.log("lets compare with wesh " + article.valueId);
                      console.log("wesh wesh" + el.valueId);
                      console.log("ici jveux voir l'id -->>", el.id);
                      console.log(el);
                      valueId = el.valueId;
                      console.log(valueId);
                      return {
                        value: el.title,
                        label: el.title + ` peut être échangé`,
                        name: "articleToExchange",
                        id: el.valueId,
                      };

                      //} else {
                      //return btn.classList.remove("btn-next-active");
                      //}
                    });

                  return (
                    <div key={index}>
                      <Select
                        className="select-toys"
                        options={option}
                        styles={customStyles}
                        // onChange={(obj) => handleArticleToExchange(obj, index)}
                        onChange={(obj) => handleArticleToExchange(obj)}
                        placeholder="Mes jouets"
                        name="articleToExchange"
                        id="select-toys"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="msg-info-exhange">
                IL FAUT UN COMPTE ET UN OBJET DE MEME VALEUR POUR POUVOIR
                PROPOSER UN ÉCHANGE
              </p>
            )}
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyleModal}
              contentLabel="Modal"
            >
              <p>{user.email}</p>

              <form ref={form} onSubmit={sendEmail}>
                <label>Name{authState.firstName}</label>
                <input type="text" name="name" value={authState.firstName} />
                <label>Email{user.email}</label>
                <input type="email" name="user_email" /*value={user.email}*/ />
                <label>Message</label>
                <textarea name="message" />
                <input type="submit" value="Send" />
              </form>
            </Modal>

            <button
              className="btn-exchange"
              id="modal-exchange"
              disable
              onClick={openModal}
            >
              Proposer un échange
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsAnnonce;
