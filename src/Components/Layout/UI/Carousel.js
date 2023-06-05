import React, { useEffect, useState } from "react";

const preventDefault = (e) => {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;
};

const enableScroll = () => {
  document.removeEventListener("wheel", preventDefault);
};

const disableScroll = () => {
  document.addEventListener("wheel", preventDefault, {
    passive: false,
  });
};

export default function Carousel(props) {
  const [index, setIndex] = useState(0);
  const [content, setContent] = useState([]);
  const length = props.children.length;
  const range = props.range;
  const indeces = [...Array(Math.min(2 * props.range + 1, length)).keys()];

  const changeHandler = (change) => {
    change >= 0
      ? setIndex((oldIndex) =>
          oldIndex + 1 > length - 1 ? length - 1 : oldIndex + 1
        )
      : setIndex((oldIndex) => (oldIndex - 1 < 0 ? 0 : oldIndex - 1));
  };

  const scrollHandler = (event) => {
    changeHandler(event.deltaY);
  };

  useEffect(() => {
    const mappedIndeces = indeces.map((id) =>
      id - index <= range && id - index >= -range ? id - index : null
    );

    let tempContent = [];
    mappedIndeces.forEach((id) => {
      tempContent.push(
        id != null &&
          React.cloneElement(props.children[id + index], {
            onClick: id != 0 ? () => changeHandler(id) : () => {},
            index: id,
          })
      );
    });

    setContent(tempContent);
  }, [index]);

  return (
    <>
      <div
        className={props.className}
        onWheel={scrollHandler}
        onMouseEnter={disableScroll}
        onMouseLeave={enableScroll}
        // ref={carouselAnimation}
      >
        {content}
      </div>
      <button onClick={() => changeHandler(-1)}>Previous</button>
      <button onClick={() => changeHandler(1)}>Next</button>
    </>
  );
}
