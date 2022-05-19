import React, { useEffect, useState } from "react";
import axios from "axios";

const GererUtilisateurs = () => {
  const [allClients, setAllClients] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/allClients`)
      .then((res) => {
        console.log("res.data :>> ", res.data);
        setAllClients(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);
  return (
    <section className="section-manage-client">
      <h1>Gérer les utilisateurs</h1>
      <p>Listes des utilisateurs </p>
      <div>
        {allClients.map((el) => {
          const { id, firstName, image, lastName, createdAt } = el;

          return (
            <div key={id} className="block-article">
              <figure>
                <img src={image} alt={lastName} />
              </figure>
              <div className="info-article">
                <h3>
                  {firstName}
                  {lastName}
                </h3>
                <span>{createdAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GererUtilisateurs;
