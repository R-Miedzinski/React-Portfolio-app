import React, { useEffect, useState, useContext } from "react";

import classes from "./MobileNav.module.scss";
import { logo } from "../../../Assets/imgs";
import Button from "../../Layout/UI/Button";
import LanguageContext from "../../../Store/language-context";
import content from "../../../Assets/content.json";
import NavButtonList from "../../Layout/UI/NavButtonList";

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
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [toggle, setToggle] = useState(false);
  const languageContext = useContext(LanguageContext);

  useEffect(() => {
    setAvailableLanguages(Object.keys(content));
  }, [languageContext.currentLanguage]);

  const listToggleHandler = () => {
    setToggle((prevState) => {
      return !prevState;
    });
  };

  const closeMenuHandler = () => {
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

  const languageChangeHandler = (event) => {
    languageContext.changeLanguage(event.target.value);
  };

  return (
    <div className={classes["nav"]} style={props.style}>
      <div className={classes["nav__top"]}>
        <img src={logo} alt="Img in header, logo" />
        <Button onClick={listToggleHandler}>{toggle ? "X" : "="}</Button>
      </div>

      <div
        className={
          toggle
            ? `${classes["nav__MobileNav"]} ${classes["nav__MobileNav--open"]}`
            : `${classes["nav__MobileNav"]} ${classes["nav__MobileNav--closed"]}`
        }
      >
        <nav>{<NavButtonList onClick={closeMenuHandler} />}</nav>
        <select
          name="language"
          value={languageContext.currentLanguage}
          onChange={languageChangeHandler}
        >
          {availableLanguages.map((language) => {
            return (
              <option key={language} value={language}>
                {language}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
