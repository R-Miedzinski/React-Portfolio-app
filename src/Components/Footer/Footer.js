import React, { useContext, useEffect, useState } from "react";

import classes from "./Footer.module.scss";
import { IonIcon } from "@ionic/react";
import { logoGithub, logoLinkedin } from "ionicons/icons";
import Button from "../Layout/UI/Button";
import LanguageContext from "../../Store/language-context";

export default function Footer(props) {
  const [navigableSections, setNavigableSections] = useState([]);
  const languageContext = useContext(LanguageContext);

  const content = languageContext.currentContent.footer;

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    setNavigableSections(
      Array.from(sections).filter((section) => {
        return section.id.includes("s-");
      })
    );
  }, [languageContext.currentLanguage]);

  return (
    <>
      <footer className={classes["s-footer"]}>
        <div className={classes["s-footer__wrapper"]}>
          <div className={classes["s-footer__linkBox"]}>
            <ul>
              {navigableSections.map((section) => {
                return (
                  <li key={section.id}>
                    <Button href={`#${section.id}`} styled={false}>
                      {section.getAttribute("navname")}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={classes["s-footer__contactBox"]}>
            <ul>
              <li>
                <Button
                  href={"href"}
                  className={classes["s-footer__link"]}
                  styled={false}
                >
                  {content.email}
                </Button>
              </li>
              <li>
                <Button
                  href={"href"}
                  className={classes["s-footer__link"]}
                  styled={false}
                >
                  {content.phone}
                </Button>
              </li>
            </ul>
          </div>
          <div className={classes["s-footer__iconBox"]}>
            <ul>
              <li>
                <Button href={"href"} styled={false}>
                  <IonIcon icon={logoGithub} />
                </Button>
              </li>
              <li>
                <Button href={"href"} styled={false}>
                  <IonIcon icon={logoLinkedin} />
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
