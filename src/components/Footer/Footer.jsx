import React from "react";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import linkedin from "../../assets/linkedin.svg";
import logo from "../../assets/logo.svg";
import upperFooter from "../../assets/footer-upper.svg";

const Footer = () => {
  return (
    <section className="section-footer">
      <div className="div-upper-footer">
        <img src={upperFooter} alt={upperFooter} />
      </div>
      <div className="container-footer">
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
      </div>
    </section>
  );
};

export default Footer;
