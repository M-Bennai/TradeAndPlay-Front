import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Annonces from "./pages/Annonces/Annonces";
import MesAnnonces from "./pages/Mesannonces/MesAnnonces";
import Login from "../src/pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import { AuthContext } from "./auth/auth";
import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import UserInfosContextProvider from "./context/UserInfosContext";

function App() {
  const [authState, setAuthState] = useState({
    firstName: "",
    lastName: "",
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
            <Route path="/" element={<Homepage />} />
            <Route path="/annonces" element={<Annonces />} />
            <Route path="/mesAnnonces" element={<MesAnnonces />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/senrengistrer" element={<SignIn />} />
          </Routes>
          <Footer />
        </UserInfosContextProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
