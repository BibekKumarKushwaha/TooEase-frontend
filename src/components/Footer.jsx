import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import the Footer specific CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>

      {/* <ul className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
        </li>
      </ul> */}

      <ul className="menu">
        <li className="menu__item"><Link to="/" className="menu__link">Home</Link></li>
        <li className="menu__item"><Link to="/aboutus" className="menu__link">About</Link></li>
        <li className="menu__item"><Link to="/services" className="menu__link">Services</Link></li>
        <li className="menu__item"><Link to="/team" className="menu__link">Team</Link></li>
        <li className="menu__item"><Link to="/contact" className="menu__link">Contact</Link></li>
      </ul>

      <p>&copy;2024 Too Ease. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
