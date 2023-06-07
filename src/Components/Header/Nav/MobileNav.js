import React, { useEffect, useState } from "react";

import classes from "./MobileNav.module.scss";
import { logo } from "../../../Assets/imgs";
import Button from "../../Layout/UI/Button";

const preventDefault = (e) => {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;
};

const enableScroll = () => {
  document.removeEventListener("wheel", preventDefault);
};

const disableScroll = () => {
  document.addEventListener("wheel", preventDefault, {
    passive: false,
  });
};

export default function MobileNav(props) {
  const [navigableSections, setNavigableSections] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    setNavigableSections(
      Array.from(sections).filter((section) => {
        return section.id.includes("s-");
      })
    );
  }, []);

  const listToggleHandler = () => {
    setToggle((prevState) => {
      return !prevState;
    });
  };

  const closeMenyHandler = () => {
    setToggle(false);
  };

  useEffect(() => {
    if (toggle) {
      disableScroll();

      document.querySelector("html").setAttribute("overflow", "hidden");
    } else {
      enableScroll();

      document.querySelector("html").setAttribute("overflow", "");
    }
  }, [toggle]);

  return (
    <div className={classes["nav"]} style={props.style}>
      <div className={classes["nav__top"]}>
        <img src={logo} alt="Img in header, logo" />
        <Button onClick={listToggleHandler}>{toggle ? "X" : "="}</Button>
      </div>

      <nav
        className={
          toggle
            ? `${classes["nav__MobileNav"]} ${classes["nav__MobileNav--open"]}`
            : `${classes["nav__MobileNav"]} ${classes["nav__MobileNav--closed"]}`
        }
      >
        <ul>
          {navigableSections.map((section) => {
            return (
              <li key={section.id}>
                <Button href={`#${section.id}`} onClick={closeMenyHandler}>
                  {section.getAttribute("navname")}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
