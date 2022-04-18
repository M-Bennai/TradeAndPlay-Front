import React, { useState, useContext, useEffect } from "react";
import { UserInfosContext } from "../../context/UserInfosContext";
import axios from "axios";

const MesAnnonces = () => {
  const { clientId } = useContext(UserInfosContext);
  const [myArticle, setMyArticles] = useState([]);
  console.log("clientId :>> ", clientId);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/article/userArticle/${clientId}`
      )
      .then((res) => {
        console.log("res.data :>> ", res.data.allArticle);
        setMyArticles(res.data.allArticle);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);
  return (
    <div>
      <h1>Mes annonces</h1>
    </div>
  );
};

export default MesAnnonces;
