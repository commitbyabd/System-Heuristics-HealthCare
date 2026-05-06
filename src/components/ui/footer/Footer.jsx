import { useLayoutEffect, useRef } from "react";
import styles from "./footer.module.css";
import { animateFooter } from "./FooterUtils";
import { FooterData } from "../../../data/components/footer/FooterData";
import { Constants } from "../../../utils/global/Constants";
import LazyImage from "../lazy-image/LazyImage";
import Container from "../container/Container";

function Footer() {
  const linksRef = useRef([]);
  const socialsRef = useRef([]);
  const bottomLinksRef = useRef([]);
  const tagLineRef = useRef(null);

  const {
    tagline = "",
    usefulLinks = [],
    servicesLinks = [],
    contactLinks = [],
    socialLinks = [],
  } = FooterData || {};

  useLayoutEffect(() => {
    animateFooter({ linksRef, socialsRef, tagLineRef, bottomLinksRef });
  }, []);

  return (
    <footer className={`${styles.footerWrap} bgGrid`}>
      <Container className={styles.container}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.logoGroup}>
              <a href="/" className={styles.logo}>
                <LazyImage src="/images/logo/sh-logo.svg" alt="Logo" />
                <span>{Constants?.company?.name}</span>
              </a>
            </div>

            <p className={styles.tagline} ref={tagLineRef}>
              {tagline || ""}
            </p>

            <div className={styles.socials}>
              {socialLinks?.map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className={styles.social}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={(el) => (socialsRef.current[idx] = el)}
                  aria-label="Social link"
                >
                  {Icon && <Icon className={styles.icon} />}
                </a>
              ))}
            </div>
          </div>

          <div
            className={styles.linksCol}
            ref={(el) => (linksRef.current[0] = el)}
          >
            <h4 className={styles.title}>Useful Links</h4>
            <ul className={styles.list}>
              {usefulLinks?.map((link, idx) => (
                <li key={idx}>
                  <a href={link?.href}>{link?.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={styles.linksCol}
            ref={(el) => (linksRef.current[1] = el)}
          >
            <h4 className={styles.title}>Our Services</h4>
            <ul className={styles.list}>
              {servicesLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link?.href}>{link?.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={styles.linksCol}
            ref={(el) => (linksRef.current[2] = el)}
          >
            <h4 className={styles.title}>Contact Us</h4>
            <ul className={styles.list}>
              {contactLinks.map(({ icon: Icon, text }, idx) => (
                <li className={styles.contactItem} key={idx}>
                  {Icon && <Icon className={styles.icon} />}
                  <span>{text || ""}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} {Constants?.company?.name}. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
