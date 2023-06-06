import React, { useEffect, useState } from "react";

import classes from "./Nav.module.scss";
import { logo } from "../../../Assets/imgs";
import NavButton from "./NavButton";

export default function Nav(props) {
  const [navigableSections, setNavigableSections] = useState([]);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    setNavigableSections(
      Array.from(sections).filter((section) => {
        return section.id.includes("s-");
      })
    );
  }, []);

  return (
    <div className={classes["nav"]}>
      <img src={logo} alt="Img in header, logo" />
      <nav>
        <ul>
          {navigableSections.map((section) => {
            return (
              <NavButton key={section.id} href={`#${section.id}`}>
                {section.getAttribute("navname")}
              </NavButton>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
