import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserInfosContext } from "../../context/UserInfosContext";

const DetailsAnnonce = () => {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  console.log("id :>> ", id);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/article/all/${id}`)
      .then((res) => {
        console.log("res.data :>> ", res.data.allArticle);
        setArticles(res.data.allArticle);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return <div key={id}>{articles}</div>;
};

export default DetailsAnnonce;
