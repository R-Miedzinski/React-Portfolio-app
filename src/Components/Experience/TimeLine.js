import React, { useContext } from "react";

import LanguageContext from "../../Store/language-context";

export default function TimeLine(props) {
  const languageContext = useContext(LanguageContext);
  const { start, end } = props.time;
  const [startTime, endTime] = [new Date(start), new Date(end)];
  const options = {
    year: "numeric",
    month: "long",
  };

  const language = languageContext.currentLanguage;

  return (
    <div>
      <span>{startTime.toLocaleString(language, options)}</span>
      <span>
        {end
          ? endTime.toLocaleString(language, options)
          : languageContext.currentContent.misc.current}
      </span>
    </div>
  );
}
