import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const url = `${process.env.REACT_APP_API_URL}/api/user/register`;
const SignIn = () => {
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [nickname, setNickname] = useState("");
  const [userImage, setUserImage] = useState("");
  const navigate = useNavigate();
  // const onSubmit = async (data) => {
  //   console.log("data :>> ", data);
  //   //setLoading(true);
  //   try {
  //     const res = await axios.post(url, data);
  //     localStorage.setItem("accessToken", res.data);
  //     //setLoading(false);

  //     navigate("/connexion", { replace: true });
  //     setError(null);
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //     setError(error.response.data.msg);
  //     //setLoading(false);
  //     console.log("error :>> ", error.response.data.msg);
  //   }
  // };
  const addUserHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("image", userImage);
    formData.append("nickname", nickname);

    console.log("formData :>> ", formData);
    await axios.post(url, formData);
    navigate(`/connexion`, { replace: true });
  };

  return (
    <section className="signIn-page">
      <h1>Créer un compte</h1>
      <h2>
        Créer votre compte pour pouvoir creer vos annonces et proposer des
        échanges !
      </h2>
      <form
        onSubmit={addUserHandler}
        method="POST"
        encType="multipart/form-data"
      >
        <label>Nom</label>
        <input
          className="input"
          name="lastName"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <label>Prénom</label>
        <input
          className="input"
          name="firstName"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>

        <label>Email</label>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Mot de passe</label>
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label>Pseudo</label>
        <input
          className="input"
          type="nickname"
          name="nickname"
          placeholder="Pseudo"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        ></input>
        <label>Adresse</label>
        <input
          className="input"
          name="address"
          placeholder="Adresse"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>

        <label htmlFor="image">Image</label>
        <input
          id="choose-file"
          className="custom-file-input"
          type="file"
          name="image"
          onChange={(e) => setUserImage(e.target.files[0])}
          accept="image/*"
        />
        <label>Ville</label>
        <input
          className="input"
          name="city"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></input>

        <button className="button" type="submit">
          Creer un compte
        </button>
      </form>
      <span>Vous avez deja un compte ? Connectez vous</span>
    </section>
  );
};

export default SignIn;
