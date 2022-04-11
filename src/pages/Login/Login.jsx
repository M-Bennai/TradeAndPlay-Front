import React, { useState, useContext } from "react";
import Input from "../../components/ui/input/Input";
import { AuthContext } from "../../auth/auth";

// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const url = `${process.env.REACT_APP_API_URL}/api/user/login`;

const Login = ({ history }) => {
  const { setAuthState, authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (data) => {
    console.log("data :>> ", data);
    setLoading(true);
    try {
      const res = await axios.post(url, data);
      localStorage.setItem("accessToken", res.data.token);
      setLoading(false);
      setAuthState({ ...authState, status: true });
      history.push("/accueil/home");
      setError(null);
    } catch (error) {
      console.log("error :>> ", error);
      setError(error.response.data.msg);
      setLoading(false);
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
      <h1>Connexion</h1>
      <h2>
        Accèdez à votre compte pour commencer a creer des annonces et pouvoir
        échanger des jouets
      </h2>
      <form>
        <label>Email</label>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        ></Input>
        <label>Mot de passe</label>
        <Input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        ></Input>
        <button className="button" type="submit">
          Connexion
        </button>
      </form>
      <span>Pas encore de compte ? Creer un compte</span>
    </section>
  );
};

export default Login;
