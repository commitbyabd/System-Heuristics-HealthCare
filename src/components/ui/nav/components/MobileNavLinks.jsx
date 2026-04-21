import React from "react";

export const MobileNavLinks = ({
  items = [],
  isLinkActive,
  onNavigate,
  onItemClick,
  activeClassName = "",
  itemClassName = "",
}) => {
  return items.map(({ label, href }) => (
    <li key={label} className={itemClassName}>
      <a
        className={isLinkActive(href) ? activeClassName : ""}
        onClick={() => {
          onNavigate(href);
          onItemClick?.();
        }}
      >
        {label}
      </a>
    </li>
  ));
};
