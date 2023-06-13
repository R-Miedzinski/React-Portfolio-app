import React, { useEffect, useState, useContext } from "react";

import classes from "./Nav.module.scss";
import { logo } from "../../../Assets/imgs";
import Button from "../../Layout/UI/Button";
import LanguageContext from "../../../Store/language-context";
import content from "../../../Assets/content.json";
import NavButtonList from "../../Layout/UI/NavButtonList";

export default function Nav(props) {
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const languageContext = useContext(LanguageContext);

  useEffect(() => {
    setAvailableLanguages(Object.keys(content));
  }, [languageContext.currentLanguage]);

  const languageChangeHandler = (event) => {
    languageContext.changeLanguage(event.target.value);
  };

  return (
    <div className={classes["nav"]} style={props.style}>
      <img src={logo} alt="Img in header, logo" />

      <nav>{<NavButtonList />}</nav>
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
  );
}
