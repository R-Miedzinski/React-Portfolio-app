import React from "react";

import classes from "./ProjectCard.module.scss";

export default function ProjectCard(props) {
  const { title, img, description, techStack } = props.project;
  const classprefix = props.classprefix;
  const position = props.index; 

  // const positionClass = `${classprefix}--${props.position}`;

  const className = `${classes[classprefix]}`; // ${classes[positionClass]}`;

  const calcZIndex = (position) => {
    return Math.abs(position);
  }

  const styleVariables = {
    "--translationX" : props.calcTranslation(position), 
    "--opacity": props.calcOpacity(position), 
    "--scale": props.calcScale(position),
    "--zIndex": calcZIndex(position)
  };

  return (
    <div className={className} onClick={props.onClick} position={props.index} style={styleVariables}>
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
