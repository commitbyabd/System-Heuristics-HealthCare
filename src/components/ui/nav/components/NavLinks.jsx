import React from "react";

export const NavLinks = ({
  items = [],
  isLinkActive,
  onNavigate,
  activeClassName = "",
}) => {
  return items.map(({ label, href }) => (
    <li key={label}>
      <a
        onClick={() => onNavigate(href)}
        className={isLinkActive(href) ? activeClassName : ""}
      >
        {label}
      </a>
    </li>
  ));
};
