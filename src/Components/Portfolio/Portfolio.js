import React, { useState, useEffect, useReducer } from "react";

import classes from "./Portfolio.module.scss";
import { img1 } from "../../Assets/imgs";
import ProjectCard from "./ProjectCard";
import Carousel from "../Layout/UI/Carousel";
import { useContext } from "react";
import LanguageContext from "../../Store/language-context";

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

const selected = (listToFilter, filters) => {
  let filteredList = [];

  filteredList = filters
    .map((key) =>
      listToFilter.filter((item) => {
        return item.category === key;
      })
    )
    .flat(1)
    .sort((item1, item2) => {
      return item1.id - item2.id;
    });

  return filteredList;
};

const carouselReducer = (state, action) => {
  if (action.type === "SET_PROJECTS") {
    const filteredList = selected(state.allProjects, action.filters);

    return {
      ...state,
      projects: filteredList,
    };
  }

  if (action.type === "SET_CAROUSEL") {
    const carousel = (
      <Carousel
        className={classes["s-portfolio__carousel"]}
        range={action.range}
        wrap={action.wrap}
      >
        {state.projects.map((project) => {
          return (
            <ProjectCard
              key={project.id}
              project={project}
              classprefix="c-card"
              calcTranslation={action.calcTranslation}
              calcOpacity={action.calcOpacity}
              calcScale={action.calcScale}
            />
          );
        })}
      </Carousel>
    );

    return {
      ...state,
      carousel: carousel,
    };
  }

  if (action.type === "NEW_LANGUAGE") {
    return {
      ...state,
      allProjects: action.projects,
    };
  }

  return {
    ...state,
    projects: selected(
      state.allProjects,
      state.allProjects.map((item) => item.category).filter(onlyUnique)
    ),
    carousel: [],
  };
};

const range = 4;

export default function Portfolio(props) {
  const languageContext = useContext(LanguageContext);
  const content = languageContext.currentContent.portfolio;

  const [projects, setProjects] = useState(content.projects);
  const [categoryList, setCategoryList] = useState(
    projects.map((item) => item.category).filter(onlyUnique)
  );

  const [filtersList, setFiltersList] = useState(categoryList);
  const [carouselState, carouselDispatch] = useReducer(carouselReducer, {
    projects: selected(projects, categoryList),
    carousel: [],
    allProjects: projects,
  });

  const categoryChangeHandler = (event) => {
    const category = event.target.textContent;

    setFiltersList(
      filtersList.includes(category)
        ? filtersList.filter((cat) => cat !== category)
        : [...filtersList, category]
    );
  };

  useEffect(() => {
    setProjects(content.projects);
    setCategoryList(
      content.projects.map((item) => item.category).filter(onlyUnique)
    );
    carouselDispatch({ type: "NEW_LANGUAGE", projects: content.projects });
  }, [languageContext.currentLanguage]);

  useEffect(() => {
    carouselDispatch({ type: "SET_PROJECTS", filters: filtersList });

    carouselDispatch({
      type: "SET_CAROUSEL",
      calcTranslation: calcTransition,
      calcOpacity,
      calcScale,
      range,
      wrap: false,
    });
  }, [languageContext.currentLanguage, filtersList]);

  const calcTransition = (position) => {
    // return `${50 + position * 100}%`;
    const k = 50;
    let sum = 0;
    for (let i = 0; i < Math.abs(position); i++) {
      sum += (1.5 * k) / 2 ** i;
    }
    if (position < 0) {
      sum = -sum;
    }

    return `${k + sum}%`;
  };

  const calcOpacity = (position) => {
    // return 1;
    return `${1 - (position / (range + 1)) ** 2}`;
  };

  const calcScale = (position) => {
    // return 1;
    return `${1 - Math.abs(position) / (range + 1)}`;
    // return calcOpacity(position);
  };

  return (
    <div className="container">
      <section
        className={classes["s-portfolio"]}
        id="s-portfolio"
        navname={content.navname}
        style={{ "--range": range }}
      >
        <h2>{content.header}</h2>
        {categoryList.map((category) => {
          return (
            <button onClick={categoryChangeHandler} key={category}>
              {category}
            </button>
          );
        })}
        {carouselState.carousel}
        {/* <Carousel className={classes["s-portfolio__carousel"]} range={range} wrap={false}>
          {projects.map((project) => {
            return (
              <ProjectCard
                key={project.id}
                project={project}
                classprefix="c-card"
                calcTranslation= {calcTransition}
                calcOpacity={calcOpacity}
                calcScale={calcScale}
              />
            );
          })}
        </Carousel> */}
      </section>
    </div>
  );
}
