import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Annonces from "./pages/Annonces/Annonces";
import Login from "../src/pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/annonces" element={<Annonces />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/senrengistrer" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
