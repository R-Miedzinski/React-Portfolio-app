import React from "react";

import classes from "./AboutMe.module.scss";
import { photo } from "../../Assets/imgs";

export default function AboutMe(props) {
  return (
    <div className="container">
      <section className={classes["s-about"]} id="s-about" navname="About Me">
        <h2>About Me</h2>

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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              consequat eros magna, at maximus orci placerat non. Phasellus vel
              tellus neque. Mauris vestibulum dui nec sem efficitur, sit amet
              condimentum orci consequat.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
