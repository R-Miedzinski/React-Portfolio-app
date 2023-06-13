import React from "react";

import classes from "./ProjectCard.module.scss";

export default function ProjectCard(props) {
  const { title, img, description, techStack, url } = props.project;
  const classprefix = props.classprefix;
  const position = props.index;

  // const positionClass = `${classprefix}--${props.position}`;

  const className = `${classes[classprefix]}`; // ${classes[positionClass]}`;

  const calcZIndex = (position) => {
    return Math.abs(position);
  };

  const styleVariables = {
    "--translationX": props.calcTranslation(position),
    "--opacity": props.calcOpacity(position),
    "--scale": props.calcScale(position),
    "--zIndex": calcZIndex(position),
  };

  const openProjectHandler = () => {
    window.open(url, "_blank");
  };

  return (
    <div
      className={className}
      onClick={props.index != 0 ? props.onClick : openProjectHandler}
      style={styleVariables}
    >
      <img src={img} alt="Project img" className={classes["c-card__img"]} />
      <h3 className={classes["c-card__title"]}>{title}</h3>
      <p className={classes["c-card__description"]}>{description}</p>
      <div className={classes["c-card__stack"]}>
        {techStack.map((tech) => {
          return (
            <span key={tech} className={classes["c-card__tech"]}>
              {tech}
            </span>
          );
        })}
      </div>
    </div>
  );
}
