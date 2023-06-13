import React, { useContext, useEffect, useState } from "react";

import classes from "./Footer.module.scss";
import { IonIcon } from "@ionic/react";
import { logoGithub, logoLinkedin } from "ionicons/icons";
import Button from "../Layout/UI/Button";
import LanguageContext from "../../Store/language-context";
import NavButtonList from "../Layout/UI/NavButtonList";

export default function Footer(props) {
  const languageContext = useContext(LanguageContext);

  const content = languageContext.currentContent.footer;

  return (
    <>
      <footer className={classes["s-footer"]}>
        <div className={classes["s-footer__wrapper"]}>
          <div className={classes["s-footer__linkBox"]}>
            {<NavButtonList styled={false} />}
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
