import React from "react";

export default function NavButton(props) {
  return (
    <li>
      <a href={props.href}>{props.children}</a>
    </li>
  );
}
