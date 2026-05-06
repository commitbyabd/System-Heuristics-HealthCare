import styles from "./ContactInfoItem.module.css";
import { Mail, MapPin, Phone } from "lucide-react";

const ICONS = {
  email: Mail,
  office: MapPin,
  phone: Phone,
};

function ContactInfoItem({ type, title, subtitle, value }) {
  const Icon = ICONS[type];

  return (
    <li className={styles.contactItem}>
      <span className={styles.iconWrap}>
        {Icon && <Icon style={{ "--icon-size": "18px" }} color="#2FD1AB" />}
      </span>
      <div className={styles.contactText}>
        <p className={styles.contactTitle}>{title}</p>
        <p className={styles.contactSubtitle}>{subtitle}</p>
        <p className={styles.contactValue}>{value}</p>
      </div>
    </li>
  );
}

export default ContactInfoItem;
