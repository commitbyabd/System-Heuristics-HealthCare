// Nav.js
// - Renders the website navigation bar for desktop and mobile.
// - Handles scroll-based shrinking and hiding/showing of navbar.
// - Manages mobile menu open/close state with GSAP animations.
// - Data sources:
//    - NavData.navItems: array of nav items with label and href
//    - Constants?.company?.name: used for logo text
// - Refs used for:
//    - navRef: main nav element (for scroll and width animations)
//    - mobileMenuRef: mobile menu container (for open/close animations)
// - Effects:
//    - setupNavbarScroll: shrinks/expands and hides/shows navbar on scroll
//    - body scroll lock/unlock when mobile menu is open
// - Utility functions:
//    - toggleMobileMenuGsap: animates mobile menu open/close
//    - setupNavbarScroll: animates navbar based on scroll and resize

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./nav.module.css";
import { toggleMobileMenuGsap, setupNavbarScroll } from "./NavUtils";
import { NavData } from "../../../data/components/nav/NavData";
import { Constants } from "../../../utils/global/Constants";
import LazyImage from "../lazy-image/LazyImage";
import Menu from "../icons/Menu";
import X from "../icons/X";
import Button from "../button/Button";
import Phone from "../icons/Phone";
import Container from "../container/Container";

const Nav = () => {
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { pathname } = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { navItems } = NavData;

  useEffect(() => {
    const cleanup = setupNavbarScroll(navRef, setIsScrolled);
    return cleanup;
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const scrollY = window.scrollY;

    // lock background scroll (works on iOS + Android)
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      // restore
      const top = document.body.style.top; // "-123px"
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, parseInt(top || "0") * -1);
    };
  }, [isMobileMenuOpen]);

  const renderNavLinks = () => {
    return navItems?.map(({ label, href }) => (
      <li key={label}>
        <a href={href} className={pathname === href ? styles.activeLink : ""}>
          {label}
        </a>
      </li>
    ));
  };

  const renderMobileNavLinks = () => {
    return navItems?.map(({ label, href }) => (
      <li key={label} className={styles.mobileNavLink}>
        <a
          href={href}
          className={pathname === href ? styles.activeLink : ""}
          onClick={() =>
            toggleMobileMenuGsap(
              mobileMenuRef,
              isMobileMenuOpen,
              setIsMobileMenuOpen,
              styles,
            )
          }
        >
          {label}
        </a>
      </li>
    ));
  };

  return (
    <div className={styles.navWrapper}>
      <nav
        ref={navRef}
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : styles.atTop}`}
      >
        <Container className={`${styles.navContainer} bgGlassWGlow`}>
          <p className={styles.logo}>
            <a href="/">
              <LazyImage src="/images/logo/sh-logo.svg" alt="Logo" />
              {Constants?.company?.name}
            </a>
          </p>

          <ul className={styles.navLinks}>{renderNavLinks()}</ul>

          <div className={styles.bookCallWrap}>
            <Button
              text="Book a call"
              variant="filled"
              Icon={Phone}
              width="150px"
            />
          </div>

          <button
            className={styles.mobileMenuButton}
            aria-label="Menu"
            onClick={() =>
              toggleMobileMenuGsap(
                mobileMenuRef,
                isMobileMenuOpen,
                setIsMobileMenuOpen,
                styles,
              )
            }
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </Container>
      </nav>

      <div ref={mobileMenuRef} className={`${styles.mobileMenu} bgGlassWGlow`}>
        <ul className={styles.mobileNavLinks}>{renderMobileNavLinks()}</ul>
      </div>
    </div>
  );
};

export default Nav;
