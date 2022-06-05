import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("email invalide")
    .required("Ce champ est obligatoire"),
  password: yup
    .string()
    .min(3, "Please fill in the password")
    .required("Ce champ est obligatoire"),
});
const url = `${process.env.REACT_APP_API_URL}/api/user/login`;

const Login = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  //const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("data :>> ", data);
    //setLoading(true);
    try {
      const res = await axios.post(url, data);
      localStorage.setItem("accessToken", res.data.token);
      //setLoading(false);
      setAuthState({ ...authState, status: true });
      if (authState.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      setError(null);
    } catch (error) {
      console.log("error :>> ", error);
      setError(error.response.data.msg);
      //setLoading(false);
      console.log("error :>> ", error.response.data.msg);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await login(user);
  //     setIsAuthenticated(response);
  //     history.replace("/homepage");
  //   } catch ({ response }) {
  //     console.log(response);
  //   }
  // };

  return (
    <section className="login-page">
      <div className="container-login">
        <h1>Connexion</h1>
        <h2>
          Accèdez à votre compte pour commencer a creer des annonces et pouvoir
          échanger des jouets
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input
            className="input"
            {...register("email", {
              required: "Required",
            })}
            type="email"
            name="email"
            placeholder="Email"
          ></input>
          <span className="warning-msg">
            {errors.email && errors.email.message}
          </span>
          <label>Mot de passe</label>
          <input
            className="input"
            {...register("password", {
              required: "Required",
            })}
            type="password"
            name="password"
            placeholder="Password"
          ></input>
          <span className="warning-msg">
            {errors.password && errors.password.message}
          </span>
          <button className="button" type="submit">
            Connexion
          </button>
        </form>
        <div className="down-msg-login">
          <span>Pas encore de compte ? Creer un compte</span>
        </div>
      </div>
    </section>
  );
};

export default Login;
