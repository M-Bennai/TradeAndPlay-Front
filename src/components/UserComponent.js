import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientInfosContext } from "../context/ClientInfosContext";
import { AuthContext } from "../auth/auth";
import { Redirect } from "react-router";

const UserComponent = () => {
  const { id } = useParams();
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  // const [phone, setPhone] = useState("");
  // const [image, setImage] = useState("");
  // const [city, setCity] = useState("");
  // const [nickname, setNickname] = useState("");

  const { authState } = useContext(AuthContext);
  const {
    setUserFirstname,
    setUserLastname,
    setUserImage,
    setUserId,
    setUserCity,
    setUserAddress,
    setUserEmail,
    setUserNickname,
    setUserPhone,
  } = useContext(ClientInfosContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log("res HERE :>> ", res);
        setUserFirstname(res.data.firstname);
        setUserLastname(res.data.entity.docs);
        setUserEmail(res.data.entity.datastudio);
        setUserImage(res.data.entity.image);
        setUserAddress(res.data.entity.roadmap);
        setUserPhone(res.data.entity.user);
        setUserEmail(res.data.entity.contact);
        setUserNickname(res.data.entity.image);
        setUserCity(res.data.entity.name);
        setUserId(id);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
    //    return () => {
    //   setFirstname();
    //   setLastname();
    //   setLinks();
    //   setRoadmapLink();
    //   setEmail();
    // };
  }, [id]);

  return <div></div>;
};

export default UserComponent;
