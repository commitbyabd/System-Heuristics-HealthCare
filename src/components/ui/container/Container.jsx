import styles from "./container.module.css";

function Container({
  children,
  maxWidth = 1300,
  as: Tag = "div",
  className = "",
  style,
  ...props
}) {
  return (
    <Tag
      className={`${styles.container} ${className}`.trim()}
      style={{ maxWidth: `${maxWidth}px`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Container;
