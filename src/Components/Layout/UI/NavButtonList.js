import React, { useContext, useEffect, useState } from "react";

import Button from "./Button";
import LanguageContext from "../../../Store/language-context";

export default function NavButtonList(props) {
  const [navigableSections, setNavigableSections] = useState([]);
  const languageContext = useContext(LanguageContext);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    setNavigableSections(
      Array.from(sections).filter((section) => {
        return section.id.includes("s-");
      })
    );
  }, [languageContext.currentLanguage]);

  const defaultOnClick = (e) => {
    e.preventDefault();
    let nav = document.querySelector("nav");
    while (nav.parentElement.getAttribute("id") !== "root") {
      nav = nav.parentElement;
    }
    const navDimensions = nav.getBoundingClientRect();

    const yOffset = -navDimensions.height;
    const chosenSection = document.querySelector(e.target.getAttribute("href"));
    const targetY =
      chosenSection.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: targetY });
  };

  return (
    <ul>
      {navigableSections.map((section) => {
        return (
          <li key={section.id}>
            <Button
              href={`#${section.id}`}
              onClick={(e) => {
                if (props.onClick) props.onClick(e);
                defaultOnClick(e);
              }}
              styled={props.styled}
              className={props.className}
            >
              {section.getAttribute("navname")}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
