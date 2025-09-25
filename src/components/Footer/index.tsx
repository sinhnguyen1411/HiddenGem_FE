import React from 'react';
import './index.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Background overlay */}
      <div className="footer__background"></div>
      
      {/* Main footer content */}
      <div className="footer__content">
        {/* About Section */}
        <div className="footer__section">
          <h3 className="footer__section-title">About</h3>
          <ul className="footer__section-links">
            <li><a href="/about" className="footer__link">About Us</a></li>
            <li><a href="/contact" className="footer__link">Contact</a></li>
            <li><a href="/privacy" className="footer__link">Privacy Policy</a></li>
            <li><a href="/terms" className="footer__link">Terms of Service</a></li>
          </ul>
        </div>

        {/* Everyone Section */}
        <div className="footer__section">
          <h3 className="footer__section-title">Everyone</h3>
          <ul className="footer__section-links">
            <li><a href="/ios-app" className="footer__link">iOS App</a></li>
            <li><a href="/android-app" className="footer__link">Android App</a></li>
            <li><a href="/web-app" className="footer__link">Web App</a></li>
          </ul>
        </div>

        {/* Businesses Section */}
        <div className="footer__section">
          <h3 className="footer__section-title">Businesses</h3>
          <ul className="footer__section-links">
            <li><a href="/business-login" className="footer__link">Business Login</a></li>
            <li><a href="/add-cafe" className="footer__link">Add Your Cafe</a></li>
          </ul>
        </div>

        {/* HiddenGem Section */}
        <div className="footer__section">
          <h3 className="footer__section-title">HiddenGem</h3>
          <ul className="footer__section-links">
            <li><a href="/blog" className="footer__link">Blog</a></li>
            <li><a href="/newsletter" className="footer__link">Newsletter</a></li>
            <li><a href="/community" className="footer__link">Community</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 