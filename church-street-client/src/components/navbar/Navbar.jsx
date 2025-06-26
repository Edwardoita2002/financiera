import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaProjectDiagram, FaSignInAlt, FaChevronLeft } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./NavBar.css";
import logo from "../../assets/logo.png";

const TEXT = {
  home: "Home",
  about: "About",
  services: "Services",
  contact: "Contact",
  projects: "Projects",
  signin: "Sign In",
};

const scrollLinkProps = {
  smooth: true,
  offset: -80,
  duration: 500,
  spy: true,
  activeClass: "active",
};

function NavLinks() {
  return (
    <>
      <ScrollLink to="home" {...scrollLinkProps}>
        {TEXT.home}
      </ScrollLink>
      <ScrollLink to="services" {...scrollLinkProps}>
        {TEXT.services}
      </ScrollLink>
      <ScrollLink to="about" {...scrollLinkProps}>
        {TEXT.about}
      </ScrollLink>
      <ScrollLink to="contact" {...scrollLinkProps} offset={-20}>
        {TEXT.contact}
      </ScrollLink>
    </>
  );
}

function ContactButtons({ id = "" }) {
  return (
    <div className="contact-buttons">
      <RouterLink to="/projects" id={id} className="btn-contacto">
        <FaProjectDiagram className="icon-left" />
        {TEXT.projects}
      </RouterLink>
      <RouterLink to="/signin" id={id} className="btn-signin">
        <FaSignInAlt className="icon-left" />
        {TEXT.signin}
      </RouterLink>
    </div>
  );
}

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const openMenu = () => {
    if (!menuOpen) setMenuOpen(true);
  };

  const closeMenu = () => {
    if (menuOpen) setMenuOpen(false);
  };

  // Cerrar menú si se clickea fuera del menú
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
        <span className="company-name">Church Street</span>
      </div>

      {/* Botón único menú: abre o cierra según estado */}
      <button
        className={`menu-toggle ${menuOpen ? "inside-menu" : ""}`}
        onClick={menuOpen ? closeMenu : openMenu}
      >
        <FaChevronLeft className={`menu-icon ${menuOpen ? "rotated" : ""}`} />
      </button>

      {/* Menú lateral */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            className="menu-panel"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="navbar-links">
              <h3 className="menu-title">Menu</h3>
              <NavLinks />
            </div>
            <ContactButtons />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Links y botones para desktop */}
      <div className="navbar-links" id="btn-desktop">
        <NavLinks />
      </div>
      <ContactButtons id="btn-desktop" />
    </nav>
  );
}

export default NavBar;
