import React from "react";

import classes from "./Button.module.scss";

export default function Button({ styled = true, ...props }) {
  const className = `${styled ? classes.btn : ""} ${props.className}`;

  return (
    <a href={props.href} className={className}>
      {props.children}
    </a>
  );
}
