import React, { useReducer } from "react";

import LanguageContext from "./language-context";
import content from "../Assets/content.json";

const defaultLanguage = "en-GB";

const fetchContent = (language) => {
  if (content[language]) {
    // console.log(content[language]);
    return content[language];
  } else {
    console.log("no content in this language");
    return content[defaultLanguage];
  }
};

const languageReduer = (state, action = {}) => {
  if (action.type === "CHANGE") {
    return {
      currentLanguage: action.target,
      currentContent: fetchContent(action.target),
    };
  }

  return {
    currentLanguage: defaultLanguage,
    currentContent: fetchContent(defaultLanguage),
  };
};

export default function LanguageProvider(props) {
  const [languageState, dispatchLanguageState] = useReducer(
    languageReduer,
    defaultLanguage,
    languageReduer
  );

  const changeLanguageHandler = (language) => {
    dispatchLanguageState({ type: "CHANGE", target: language });
  };

  const languageContext = {
    currentLanguage: languageState.currentLanguage,
    currentContent: languageState.currentContent,
    changeLanguage: changeLanguageHandler,
  };

  return (
    <LanguageContext.Provider value={languageContext}>
      {props.children}
    </LanguageContext.Provider>
  );
}
