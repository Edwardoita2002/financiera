import React from 'react';
import './footer.css';
import { FaFacebookF, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">

        <div className="footer-logo">Church Street Management ll</div>

      </div>

      <div className="footer-nav">
        <Link to="#"><FaInstagram /> Instagram</Link>
        <Link to="#"><FaFacebookF /> Facebook</Link>
        <Link to="#"><FaLinkedin /> LinkedIn</Link>

      </div>

      <div className="footer-bottom">
        <p>© 2023 Church Street Management. All rights reserved. Premium Apartment Rentals in Paterson, New Jersey.</p>
      </div>
    </footer>
  );
};

export default Footer;
