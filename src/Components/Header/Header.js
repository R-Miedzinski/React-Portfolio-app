import React from "react";

import classes from "./Header.module.scss";
import Nav from "./Nav/Nav";

export default function Header(props) {
  return (
    <>
      <Nav />
      <div className="container">
        <section className={classes["s-header"]} id="s-header" navname="Header">
          <header>
            <h1>Hello! This is my page</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              consequat eros magna, at maximus orci placerat non. Phasellus vel
              tellus neque. Mauris vestibulum dui nec sem efficitur, sit amet
              condimentum orci consequat. Praesent in nisi tempus, tempor lacus
              et, pretium eros. Sed porta ipsum et orci lacinia pharetra. Sed
              iaculis sodales posuere. Nunc consectetur neque arcu, quis gravida
              ligula dapibus nec. Vestibulum rhoncus, felis sed porttitor
              commodo, sapien nunc auctor justo, nec venenatis diam nibh a
              tellus. Morbi sit amet laoreet mauris. Phasellus sit amet
              fringilla elit.
            </p>
          </header>
        </section>
      </div>
    </>
  );
}
