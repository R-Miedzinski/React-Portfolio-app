import React, { useEffect, useState } from "react";
import useMediaQueries from "media-queries-in-react";

import classes from "./Header.module.scss";
import Nav from "./Nav/Nav";
import MobileNav from "./Nav/MobileNav";

const delay = 500;

export default function Header(props) {
  const mediaQueries = useMediaQueries({
    desktop: "screen and (min-width: 800px)",
  });

  const [navMountedStyle, navUnmountedStyle] = [
    { opacity: 1, transition: `all ${delay}ms` },
    {
      opacity: 1,
      transform: "translateY(-100%)",
      transition: `all ${delay}ms`,
    },
  ];
  const [mobileNavMountedStyle, mobileNavUnmountedStyle] = [
    { opacity: 1, transition: `all ${delay}ms` },
    {
      opacity: 1,
      transform: "translateX(100%)",
      transition: `all ${delay}ms`,
    },
  ];

  const [justLoaded, setJustLoaded] = useState(true);
  const [currentNavStyle, setCurrentNavStyle] = useState(
    mediaQueries.desktop ? navMountedStyle : null
  );
  const [currentMobileNavStyle, setCurrentMobileNavStyle] = useState(
    !mediaQueries.desktop ? mobileNavMountedStyle : null
  );

  useEffect(() => {
    let timeoutID1;
    let timeoutID2;

    if (justLoaded) {
      setJustLoaded(false);
      return;
    }

    const changeDesktopNav = (style) => {
      setCurrentNavStyle(style);
    };

    const changeMobileNav = (style) => {
      setCurrentMobileNavStyle(style);
    };

    if (mediaQueries.desktop) {
      changeDesktopNav(navUnmountedStyle);

      timeoutID1 = setTimeout(() => {
        changeDesktopNav(navMountedStyle);
        changeMobileNav(mobileNavUnmountedStyle);
      }, delay / 10);

      timeoutID2 = setTimeout(() => {
        changeMobileNav(null);
      }, delay);
    }

    if (!mediaQueries.desktop) {
      changeMobileNav(mobileNavUnmountedStyle);

      timeoutID1 = setTimeout(() => {
        changeMobileNav(mobileNavMountedStyle);
        changeDesktopNav(navUnmountedStyle);
      }, delay / 10);

      timeoutID2 = setTimeout(() => {
        changeDesktopNav(null);
      }, delay);
    }

    return () => {
      clearTimeout(timeoutID1);
      clearTimeout(timeoutID2);
    };
  }, [mediaQueries.desktop]);

  // useEffect(() => {}, [mediaQueries.mobile]);

  // console.log(mediaQueries.mobile);

  return (
    <>
      {/* {desktopNav} */}
      {/* {mobileNav} */}
      {currentNavStyle && <Nav style={currentNavStyle} />}
      {currentMobileNavStyle && <MobileNav style={currentMobileNavStyle} />}
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
