import styles from "./faq-list.module.css";

export default function FaqList({ children, className = "" }) {
  return <div className={`${styles.list} ${className}`.trim()}>{children}</div>;
}
