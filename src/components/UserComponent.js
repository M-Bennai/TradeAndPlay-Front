import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientInfosContext } from "../context/ClientInfosContext";
import { AuthContext } from "../auth/auth";
import { Redirect } from "react-router";

const UserComponent = () => {
  const { id } = useParams();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const { authState } = useContext(AuthContext);
  const { setFirstname, setLastname, setImage, setUserId } = useContext(
    ClientInfosContext
  );

  useEffect(() => {
    axios.get;
  });

  return <div></div>;
};

export default UserComponent;
