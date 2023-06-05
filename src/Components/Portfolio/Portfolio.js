import React from "react";

import classes from "./Portfolio.module.scss";
import { img1 } from "../../Assets/imgs";
import ProjectCard from "./ProjectCard";
import Carousel from "../Layout/UI/Carousel";

const projects = [
  {
    id: "p1",
    title: "Test Project 1",
    img: img1,
    description:
      "Some project I worked on, one of many, go and see others Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "p2",
    title: "Test Project 2",
    img: img1,
    description: "Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "p3",
    title: "Test Project 3",
    img: img1,
    description: "Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "p4",
    title: "Test Project 4",
    img: img1,
    description: "Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "p5",
    title: "Test Project 5",
    img: img1,
    description: "Some project I worked on, one of many, go and see others",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
];

export default function Portfolio(props) {
  return (
    <div className="container">
      <section
        className={classes["s-portfolio"]}
        id="s-portfolio"
        navname="Portfolio"
      >
        <Carousel className={classes["s-portfolio__carousel"]} range={3}>
          {projects.map((project) => {
            return (
              <ProjectCard
                key={project.id}
                project={project}
                classprefix="c-card"
              />
            );
          })}
        </Carousel>
      </section>
    </div>
  );
}
