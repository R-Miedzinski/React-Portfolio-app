import React from "react";

import Header from "./Components/Header/Header";
import AboutMe from "./Components/AboutMe/AboutMe";
import Experience from "./Components/Experience/Experience";
import Portfolio from "./Components/Portfolio/Portfolio";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import LanguageProvider from "./Store/LanguageProvider";

function App() {
  return (
    <LanguageProvider>
      {/* header, nav and  introduction */}
      <Header />
      <main>
        {/* About me, info, photo, description */}
        <AboutMe />
        {/* Experience and education */}
        <Experience />
        {/* Portfolio, projects */}
        <Portfolio />
        {/* Contact info and message form */}
        <Contact />
      </main>
      {/* Footer */}
      <Footer />
    </LanguageProvider>
  );
}

export default App;
