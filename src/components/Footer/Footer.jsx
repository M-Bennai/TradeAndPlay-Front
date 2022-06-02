import React from "react";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import linkedin from "../../assets/linkedin.svg";
import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <section className="section-footer">
      <div className="footer-title-media">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className="social-media">
          <img src={instagram} alt={instagram} />
          <img src={twitter} alt={twitter} />
          <img src={linkedin} alt={linkedin} />
        </div>
      </div>
      <ul className="menu-footer">
        <li>mentions légales</li>
        <li>conditions générales</li>
        <li></li>
      </ul>
    </section>
  );
};

export default Footer;
