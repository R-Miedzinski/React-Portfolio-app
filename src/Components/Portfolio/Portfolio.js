import React, { useState, useEffect, useReducer } from "react";

import classes from "./Portfolio.module.scss";
import { img1 } from "../../Assets/imgs";
import ProjectCard from "./ProjectCard";
import Carousel from "../Layout/UI/Carousel";

const DUMMY_PROJECTS = [
  {
    id: "1",
    title: "Test Project 1",
    img: img1,
    description:
      "Some project I worked on, one of many, go and see others Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "FrontEnd",
  },
  {
    id: "2",
    title: "Test Project 2",
    img: img1,
    description: "Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "FrontEnd",
  },
  {
    id: "3",
    title: "Science 1",
    img: img1,
    description: "Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Science",
  },
  {
    id: "4",
    title: "Test gameDev 2",
    img: img1,
    description: "Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "GameDev",
  },
  {
    id: "5",
    title: "Test Project 3",
    img: img1,
    description: "Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "FrontEnd",
  },
  {
    id: "6",
    title: "Test gameDev 1",
    img: img1,
    description: "Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "GameDev",
  },
  {
    id: "7",
    title: "Science 2",
    img: img1,
    description: "Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Science",
  },
  {
    id: "8",
    title: "Test gameDev 3",
    img: img1,
    description: "Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "GameDev",
  },
  {
    id: "9",
    title: "Test Project 4",
    img: img1,
    description: "Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "FrontEnd",
  },
  {
    id: "10",
    title: "Test gameDev 4",
    img: img1,
    description: "Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "GameDev",
  },
];

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
const categoryList = DUMMY_PROJECTS.map((item) => item.category).filter(
  onlyUnique
);

const initialCarouselState = {
  projects: selected(DUMMY_PROJECTS, categoryList),
  carousel: [],
};

const carouselReducer = (state, action) => {
  if (action.type === "SET_PROJECTS") {
    const filteredList = selected(DUMMY_PROJECTS, action.filters);

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

  return initialCarouselState;
};

const range = 4;

export default function Portfolio(props) {
  const [filtersList, setFiltersList] = useState(categoryList);
  // const [projects, setProjects] = useState(selected(DUMMY_PROJECTS, filtersList));
  // const [carousel, setCarousel] = useState([]);
  const [carouselState, carouselDispatch] = useReducer(
    carouselReducer,
    initialCarouselState
  );

  const categoryChangeHandler = (event) => {
    const category = event.target.textContent;

    setFiltersList(
      filtersList.includes(category)
        ? filtersList.filter((cat) => cat !== category)
        : [...filtersList, category]
    );
  };

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
  }, [filtersList]);

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
        navname="Portfolio"
        style={{ "--range": range }}
      >
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
