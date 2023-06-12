import React from "react";

import TimeLine from "./TimeLine";

export default function ExperienceList(props) {
  return (
    <ul className={props.className}>
      {props.positions.map((position) => {
        return (
          <li key={position.title}>
            <h3>{position.title}</h3>
            <TimeLine time={position.time} />
            <p>{position.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
