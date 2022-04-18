import { React, createContext, useState } from "react";

export const UserInfosContext = createContext();

const UserInfosContextProvider = ({ children }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  return (
    <UserInfosContext.Provider
      value={{
        userId,
        setUserId,
        firstname,
        setFirstname,
        lastname,
        setLastname,
        email,
        setEmail,
        address,
        setAddress,
        phone,
        setPhone,
        image,
        setImage,
      }}
    >
      {children}
    </UserInfosContext.Provider>
  );
};

export default UserInfosContextProvider;
