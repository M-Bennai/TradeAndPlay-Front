import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Annonces from "./pages/Annonces/Annonces";
import MesAnnonces from "./pages/Mesannonces/MesAnnonces";
import Login from "../src/pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import { AuthContext } from "./auth/auth";

import Footer from "./components/Footer/Footer";
import UserInfosContextProvider from "./context/UserInfosContext";
import DetailsAnnonce from "./pages/DetailsAnnonce/DetailsAnnonce";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import CreerAnnonce from "./pages/CreerAnnonce/CreerAnnonce";
import GererAnnonces from "./pages/AdminPages/gererAnnonces/GererAnnonces";
import GererUtilisateurs from "./pages/AdminPages/gererUtilisateurs/GererUtilisateurs";
import HomepageAdmin from "./pages/AdminPages/homepageAdmin/HomepageAdmin";

function App() {
  const [authState, setAuthState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    image: "",
    role: "",
    status: false,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAuthState({ ...authState, status: true });
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <UserInfosContextProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/admin" element={<HomepageAdmin />} />
            <Route exact path="/annonces" element={<Annonces />} />
            <Route path="/mesAnnonces/:id" element={<MesAnnonces />} />
            <Route path="/annonces/:id" element={<DetailsAnnonce />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/senrengistrer" element={<SignIn />} />
            <Route path="/creeruneannonce" element={<CreerAnnonce />} />
            <Route path="/gererannonces" element={<GererAnnonces />} />
            <Route path="/gererutilisateurs" element={<GererUtilisateurs />} />
            <Route element={<PageNotFound />} />
          </Routes>
          <Footer />
        </UserInfosContextProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
