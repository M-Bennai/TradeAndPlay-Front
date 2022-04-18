import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const url = `${process.env.REACT_APP_API_URL}/api/user/register`;
const SignIn = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("data :>> ", data);
    //setLoading(true);
    try {
      const res = await axios.post(url, data);
      localStorage.setItem("accessToken", res.data);
      //setLoading(false);

      navigate("/connexion", { replace: true });
      setError(null);
    } catch (error) {
      console.log("error :>> ", error);
      setError(error.response.data.msg);
      //setLoading(false);
      console.log("error :>> ", error.response.data.msg);
    }
  };

  return (
    <section className="signIn-page">
      <h1>Créer un compte</h1>
      <h2>
        Créer votre compte pour pouvoir creer vos annonces et proposer des
        échanges !
      </h2>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input className="input"></input>

        <label>Mot de passe</label>
        <input className="input"></input>
        <button className="button" type="submit">
          Creer un compte
        </button>
      </form>
      <span>Vous avez deja un compte ? Connectez vous</span>
    </section>
  );
};

export default SignIn;
