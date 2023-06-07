import React, { useEffect, useState } from "react";

export default function useDelayedMount(isMountedInitial, delay) {
  const [isMounted, setIsMounted] = useState(isMountedInitial);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutID;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
      // timeoutID = setTimeout(() => setShouldRender(true), delay);
    } else if (!isMounted && shouldRender) {
      timeoutID = setTimeout(() => {
        setShouldRender(false);
      }, delay);
    }

    return () => clearTimeout(timeoutID);
  }, [isMounted, delay, shouldRender]);

  return [shouldRender, isMounted, setIsMounted];
}
