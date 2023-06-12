import React, { useContext } from "react";

import classes from "./AboutMe.module.scss";
import { photo } from "../../Assets/imgs";
import LanguageContext from "../../Store/language-context";

export default function AboutMe(props) {
  const languageContext = useContext(LanguageContext);
  const content = languageContext.currentContent.about;

  return (
    <div className="container">
      <section
        className={classes["s-about"]}
        id="s-about"
        navname={content.navname}
      >
        <h2>{content.header}</h2>

        <div className={classes["s-about__content-box"]}>
          <div className={classes["s-about__info-box"]}>
            <img src={photo} alt="Photo of me in About" />
            {/* <ul>
              <li>Location</li>
              <li>Links</li>
              <li></li>
            </ul> */}
          </div>
          <div className={classes["s-about__description-box"]}>
            <p>{content.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
