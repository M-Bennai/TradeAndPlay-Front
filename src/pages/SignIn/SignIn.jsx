import React from "react";
import Input from "../../components/ui/input/Input";

const SignIn = () => {
  return (
    <section className="signIn-page">
      <h1>Créer un compte</h1>
      <h2>
        Créer votre compte pour pouvoir creer vos annonces et proposer des
        échanges !
      </h2>
      <form>
        <label>Email</label>
        <Input></Input>
        <label>Mot de passe</label>
        <Input></Input>
        <button className="button">Creer un compte</button>
      </form>
      <span>Vous avez deja un compte ? Connectez vous</span>
    </section>
  );
};

export default SignIn;
