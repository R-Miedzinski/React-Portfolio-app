import React from "react";

const LanguageContext = React.createContext({
  currentLanguage: "",
  currentContent: {},
  changeLanguage: (language) => {},
});

export default LanguageContext;
