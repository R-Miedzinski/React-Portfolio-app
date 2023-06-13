import React from "react";

export default function TechList(props) {
  const { category, items } = props;

  return (
    <div>
      <h3>{category}</h3>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.tech}>
              {item.tech}
              <span>{item.level}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
