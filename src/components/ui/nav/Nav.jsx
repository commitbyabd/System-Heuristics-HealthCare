import styles from "./nav.module.css";
import BackgroundFilledButton from "../buttons/background-filled/BackgroundFilledButton";
import Phone from "../icons/Phone";
import ChevronDown from "../icons/ChevronDown";

function Nav() {
  const links = [
    { label: "About", href: "#" },
    { label: "Security", href: "#" },
    { label: "Solutions", href: "#", hasDropdown: true },
    { label: "Resources", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "AI", href: "#" },
  ];

  return (
    <nav className={styles.nav}>
      <a href="/" className={styles.brand}>
        <img src="/images/nav/sh-logo.svg" alt="System Heuristics" className={styles.logo} />
        <span className={styles.brandName}>System Heuristics</span>
      </a>

      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={styles.link}>
              {link.label}
              {link.hasDropdown && <ChevronDown size={14} />}
            </a>
          </li>
        ))}
      </ul>

      <BackgroundFilledButton text="Book a call" Icon={Phone} width="150px" />
    </nav>
  );
}

export default Nav;
