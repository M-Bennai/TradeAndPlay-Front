import React from "react";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import linkedin from "../../assets/linkedin.svg";

const Footer = () => {
  return (
    <section className="section-footer">
      <div className="footer-title-media">
        <div>
          <h1>Trade and Play</h1>
        </div>
        <div>
          <img src={instagram} alt={instagram} />
          <img src={twitter} alt={twitter} />
          <img src={linkedin} alt={linkedin} />
        </div>
      </div>
      <ul>
        <li>mentions légales</li>
        <li>conditions générales</li>
        <li></li>
      </ul>
    </section>
  );
};

export default Footer;
