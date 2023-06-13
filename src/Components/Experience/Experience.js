import React, { useContext, useEffect, useReducer, useState } from "react";

import classes from "./Experience.module.scss";
import ExperienceList from "./ExperienceList";
import TechList from "./TechList";
import LanguageContext from "../../Store/language-context";

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

const stackReducer = (state, action) => {
  if (action.type === "NEW_LANGUAGE") {
    const temporarySortedTechStack = [];

    action.categories.forEach((category) => {
      const filteredTech = action.techStack
        .filter((item) => item.category === category)
        .sort((a, b) => a.order - b.order);

      temporarySortedTechStack.push({ category, items: filteredTech });
    });

    temporarySortedTechStack.sort((a, b) => b.items.length - a.items.length);

    return {
      sortedTechStack: temporarySortedTechStack,
      techStack: action.techStack,
    };
  }

  return {
    sortedTechStack: [],
    techStack: [],
  };
};

export default function Experience(props) {
  const languageContext = useContext(LanguageContext);
  const content = languageContext.currentContent.experience;

  const [positionsList, setPostitionsList] = useState(content.positionsList);
  const [educationList, setEducationList] = useState(content.educationList);

  const [techStackState, dispatchStackState] = useReducer(stackReducer, {
    sortedTechStack: [],
    techStack: content.techStack,
  });

  const categories = content.techStack
    .map((item) => item.category)
    .filter(onlyUnique);

  useEffect(() => {
    setPostitionsList(content.positionsList);
    setEducationList(content.educationList);

    dispatchStackState({
      type: "NEW_LANGUAGE",
      techStack: content.techStack,
      categories: categories,
    });
  }, [languageContext.currentLanguage]);

  return (
    <div className="container">
      <section
        className={classes["s-experience"]}
        id="s-experience"
        navname={content.navname}
      >
        <h2>{content.header}</h2>

        <div className={classes["s-experience__lists"]}>
          <ExperienceList
            className={classes["s-experience__experienceList"]}
            positions={positionsList}
          />
          <ExperienceList
            className={classes["s-experience__experienceList"]}
            positions={educationList}
          />
        </div>
        <div className={classes["s-experience__techList"]}>
          {techStackState.sortedTechStack.map((techCategory) => {
            return (
              <TechList
                key={techCategory.category}
                category={techCategory.category}
                items={techCategory.items}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
