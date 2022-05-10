import React from "react";

const CreerAnnonce = () => {
  return (
    <section className="section-creer-annonce">
      <h1>Creer une annonce</h1>
      <p>
        Creer votre annonce pour que les autres utilisateurs puissent vous
        proposer un échange. Cela vous permet aussi de proposer un échange avec
        un jouet de même catégorie.
      </p>
      <form>
        <div>
          <label htmlFor="name">Nom du jouet</label>
          <input className="input"></input>
          <label htmlFor="ageRange">Tranche d'age</label>
          <input className="input"></input>
          <label htmlFor="price">Valeur</label>
          <input className="input"></input>
          <label htmlFor="condition">Etat</label>
          <input className="input"></input>
          <label htmlFor="image">Image</label>
          <input
            id="choose-file"
            className="custom-file-input"
            type="file"
            name="image"
            accept="image/*"
          />
          <label htmlFor="description">Description</label>
          <input className="description-annonce"></input>
        </div>
        <button>Creer une annonce</button>
      </form>
    </section>
  );
};

export default CreerAnnonce;
