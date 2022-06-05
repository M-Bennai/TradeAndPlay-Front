import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import axios from "axios";
const url = `${process.env.REACT_APP_API_URL}/api/user/register`;

const schema = yup.object().shape({
  email: yup.string().email().required("Ce champs est requis"),
  password: yup
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caracteres")
    .required("Ce champs est requis"),
});

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
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setRole("client");
    console.log("i wanna see the role:>> ", role);
  }, []);

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
    formData.append("role", role);

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
        onSubmit={handleSubmit(addUserHandler)}
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
          {...register("email", {
            required: "Required",
          })}
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <span className="warning-email">
          {errors.email && errors.email.message}
        </span>
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
