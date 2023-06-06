import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import React, { useCallback, useEffect, useState } from "react";

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

const expansion = 1;
const contraction = 0;

export default function Carousel(props) {
  const [index, setIndex] = useState(0);
  const [content, setContent] = useState([]);
  const [children, setChildren] = useState(props.children);
  const { range, wrap } = props;
  const length = props.children.length;
  const indeces = [...Array(length).keys()];
  // Math.min(2 * props.range + 1, length)
  const changeHandler = useCallback(
    (change) => {
      change >= 0
        ? setIndex((oldIndex) =>
            oldIndex + 1 > length - 1 ? (wrap ? 0 : length - 1) : oldIndex + 1
          )
        : setIndex((oldIndex) =>
            oldIndex - 1 < 0 ? (wrap ? length - 1 : 0) : oldIndex - 1
          );
    },
    [wrap, length]
  );

  const scrollHandler = (event) => {
    changeHandler(event.deltaY);
  };

  useEffect(() => {
    const mappedIndeces = indeces.map((id) =>
      id - index <= range && id - index >= -range
        ? id - index
        : wrap
        ? index - id
        : null
    );

    let tempContent = [];
    mappedIndeces.forEach((id) => {
      tempContent.push(
        id !== null &&
          React.cloneElement(props.children[id + index], {
            onClick: id !== 0 ? () => changeHandler(id) : () => {},
            index: id,
          })
      );
    });

    setContent(tempContent);
  }, [index, props.children, range, wrap]);

  const calcDisplacement = useCallback(
    (children, childrenKeys, scannedKeys, id) => {
      return children
        .slice(0, childrenKeys.indexOf(scannedKeys[id]) + 1)
        .reduce((accumulator, currentValue) => {
          return scannedKeys.includes(currentValue.key)
            ? accumulator
            : accumulator + 1;
        }, 0);
    },
    []
  );

  useEffect(() => {
    if (children.length <= 0) {
      setChildren(props.children);
      setIndex(0);
      return;
    }

    const direction = children.length - length < 0 ? expansion : contraction;

    const prevKeys = children.map((child) => child.key);
    const newKeys = props.children.map((child) => child.key);
    const prevCentral = children[index].key;

    if (direction === expansion) {
      const displacment = calcDisplacement(
        props.children,
        newKeys,
        prevKeys,
        index
      );

      setIndex(index + displacment);
    } else if (direction === contraction) {
      const displacment = calcDisplacement(children, prevKeys, newKeys, index);

      const newCentral = props.children
        .map((child) => child.key)
        .indexOf(prevCentral);

      let newIndex =
        index - displacment >= 0
          ? index - displacment < length
            ? index - displacment
            : length - 1
          : 0;

      setIndex(newCentral >= 0 ? newCentral : newIndex);
    }

    setChildren(props.children);
  }, [props.children]);

  return (
    <>
      <div
        className={props.className}
        onWheel={scrollHandler}
        onMouseEnter={disableScroll}
        onMouseLeave={enableScroll}
      >
        {content}
      </div>
      <button onClick={() => changeHandler(-1)}>Previous</button>
      <button onClick={() => changeHandler(1)}>Next</button>
    </>
  );
}
