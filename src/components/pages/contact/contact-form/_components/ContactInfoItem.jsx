import styles from "./ContactInfoItem.module.css";
import Mail from "../../../../ui/icons/Mail";
import MapPin from "../../../../ui/icons/MapPin";
import Phone from "../../../../ui/icons/Phone";

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
        {Icon && <Icon size={18} color="#2FD1AB" />}
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
