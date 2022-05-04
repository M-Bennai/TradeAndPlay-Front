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
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/all/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log("res HERE :>> ", res);
        setFirstname(res.data.user.name);
        setFiles(res.data.entity.docs);
        setLinks(res.data.entity.datastudio);
        setImage(res.data.entity.image);
        setRoadmapLink(res.data.entity.roadmap);
        setConsultant(res.data.entity.user);
        setEmail(res.data.entity.contact);
        setClientImage(res.data.entity.image);
        setClientName(res.data.entity.name);
        setClientId(id);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
       return () => {
      setFirstname();
      setLastname();
      setLinks();
      setRoadmapLink();
      setEmail();
    };

  }, [id]);

  return <div></div>;
};

export default UserComponent;
