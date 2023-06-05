import React, { useState } from "react";

// import { useAutoAnimate } from "@formkit/auto-animate/react";

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
  // const [carouselAnimation, enableCarouselAnimation] = useAutoAnimate({});
  const length = props.children.length;

  // useEffect(() => {
  //   if (carouselRef.current) {
  //     autoAnimate(carouselRef.current);
  //   }
  // }, [carouselRef]);

  const previousHandler = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? 0 : newIndex);
  };

  const nextHandler = () => {
    const newIndex = index + 1;
    setIndex(newIndex > length - 1 ? length - 1 : newIndex);
  };

  const scrollHandler = (event) => {
    if (event.deltaY < 0) {
      nextHandler();
      return;
    }

    if (event.deltaY > 0) {
      previousHandler();
      return;
    }
  };
  const prevIndeces = [
    index - 2 < 0 ? null : index - 2,
    index - 1 < 0 ? null : index - 1,
  ];

  const prevIndex1 = prevIndeces[0];
  const prevIndex2 = prevIndeces[1];

  const nextIndeces = [
    index + 2 < length ? index + 2 : null,
    index + 1 < length ? index + 1 : null,
  ];
  // console.log(prevIndeces, nextIndeces);
  const nextIndex1 = nextIndeces[0];
  const nextIndex2 = nextIndeces[1];

  return (
    <>
      <div
        className={props.className}
        onWheel={scrollHandler}
        onMouseEnter={disableScroll}
        onMouseLeave={enableScroll}
        // ref={carouselAnimation}
      >
        {/* {prevIndeces.map(
          (prevIndex) =>
            prevIndex != null &&
            React.cloneElement(props.children[prevIndex], {
              position: "left",
              onClick: previousHandler,
              key: prevIndex,
            })
        )} */}
        {prevIndex1 != null &&
          React.cloneElement(props.children[prevIndex1], {
            onClick: previousHandler,
            index: `${index - prevIndex1}`,
          })}
        {prevIndex2 != null &&
          React.cloneElement(props.children[prevIndex2], {
            onClick: previousHandler,
            index: `${index - prevIndex2}`,
          })}
        {React.cloneElement(props.children[index], {
          index: `${index - index}`,
        })}
        {nextIndex2 != null &&
          React.cloneElement(props.children[nextIndex2], {
            onClick: nextHandler,
            index: `${index - nextIndex2}`,
          })}
        {nextIndex1 != null &&
          React.cloneElement(props.children[nextIndex1], {
            onClick: nextHandler,
            index: `${index - nextIndex1}`,
          })}

        {/* {nextIndeces.map(
          (nextIndex) =>
            nextIndex != null &&
            React.cloneElement(props.children[nextIndex], {
              position: "right",
              onClick: nextHandler,
              // key: nextIndex,
            })
        )} */}
      </div>
      <button onClick={previousHandler}>Previous</button>
      <button onClick={nextHandler}>Next</button>
    </>
  );
}
