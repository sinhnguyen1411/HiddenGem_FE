import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components";
import "./NavBar.css";

interface NavBarProps {
  className?: string;
}

const NavBar: React.FC<NavBarProps> = ({ className = "" }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`nav-bar ${className}`}>
      <div className="nav-bar__container">
        {/* Navigation Links */}
        <nav className="nav-bar__navigation">
          <Link
            to="/"
            className={`nav-bar__nav-link ${
              isActive("/") ? "nav-bar__nav-link--active" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/store"
            className={`nav-bar__nav-link ${
              isActive("/store") ? "nav-bar__nav-link--active" : ""
            }`}
          >
            Store
          </Link>
          <Link
            to="/location"
            className={`nav-bar__nav-link ${
              isActive("/location") ? "nav-bar__nav-link--active" : ""
            }`}
          >
            Location
          </Link>
          <Link
            to="/about"
            className={`nav-bar__nav-link ${
              isActive("/about") ? "nav-bar__nav-link--active" : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/blog"
            className={`nav-bar__nav-link ${
              isActive("/blog") ? "nav-bar__nav-link--active" : ""
            }`}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className={`nav-bar__nav-link ${
              isActive("/contact") ? "nav-bar__nav-link--active" : ""
            }`}
          >
            Contact
          </Link>
          <Link
            to="/promotion"
            className={`nav-bar__nav-link ${
              isActive("/promotion") ? "nav-bar__nav-link--active" : ""
            }`}
          >
            Promotion
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
