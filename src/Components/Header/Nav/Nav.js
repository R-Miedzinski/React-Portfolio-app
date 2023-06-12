import React, { useEffect, useState, useContext } from "react";

import classes from "./Nav.module.scss";
import { logo } from "../../../Assets/imgs";
import Button from "../../Layout/UI/Button";
import LanguageContext from "../../../Store/language-context";
import content from "../../../Assets/content.json";

export default function Nav(props) {
  const [navigableSections, setNavigableSections] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const languageContext = useContext(LanguageContext);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    setNavigableSections(
      Array.from(sections).filter((section) => {
        return section.id.includes("s-");
      })
    );

    setAvailableLanguages(Object.keys(content));
  }, [languageContext.currentLanguage]);

  const languageChangeHandler = (event) => {
    languageContext.changeLanguage(event.target.value);
  };

  return (
    <div className={classes["nav"]} style={props.style}>
      <img src={logo} alt="Img in header, logo" />
      <nav>
        <ul>
          {navigableSections.map((section) => {
            return (
              <li key={section.id}>
                <Button href={`#${section.id}`}>
                  {section.getAttribute("navname")}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
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
