import { useState, useEffect, MutableRefObject } from "react";

import { isTouchDevice } from "shared/utils/isTouchDevice";

export enum SwipeDirection {
  RIGHT = "right",
  LEFT = "left",
  UP = "up",
  DOWN = "down",
}

type SwipePosition = {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
};

const initialPosition: SwipePosition = {
  xStart: 0,
  xEnd: 0,
  yStart: 0,
  yEnd: 0,
};

export const useSwipe = (
  ref: MutableRefObject<HTMLElement | null | undefined>,
  thresholdPX: number,
  onDirectionChange?: (direction: SwipeDirection) => void
) => {
  const [swipePosition, setSwipePosition] =
    useState<SwipePosition>(initialPosition);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>();

  const handleTouchStart = (event: TouchEvent) => {
    setSwipePosition((prev) => ({
      ...prev,
      xStart: event.changedTouches[0].clientX,
      yStart: event.changedTouches[0].clientY,
    }));
  };

  const handleTouchEnd = (event: TouchEvent) => {
    if (event.changedTouches && event.changedTouches.length > 0) {
      setSwipePosition((prev) => ({
        ...prev,
        xEnd: event.changedTouches[0].clientX,
        yEnd: event.changedTouches[0].clientY,
      }));
    }
  };

  const handleMouseDown = (event: MouseEvent) => {
    setSwipePosition((prev) => ({
      ...prev,
      xStart: event.clientX,
      yStart: event.clientY,
    }));
  };

  const handleMouseUp = (event: MouseEvent) => {
    setSwipePosition((prev) => ({
      ...prev,
      xEnd: event.clientX,
      yEnd: event.clientY,
    }));
  };

  useEffect(() => {
    const currentElement = ref.current;

    if (currentElement) {
      if (isTouchDevice()) {
        currentElement.addEventListener("touchstart", handleTouchStart);
        currentElement.addEventListener("touchend", handleTouchEnd);
      } else {
        currentElement.addEventListener("mousedown", handleMouseDown);
        currentElement.addEventListener("mouseup", handleMouseUp);
      }
    }

    return () => {
      if (currentElement) {
        if (isTouchDevice()) {
          currentElement.removeEventListener("touchstart", handleTouchStart);
          currentElement.removeEventListener("touchend", handleTouchEnd);
        } else {
          currentElement.removeEventListener("mousedown", handleMouseDown);
          currentElement.removeEventListener("mouseup", handleMouseUp);
        }
      }
    };
  }, [ref.current]);

  useEffect(() => {
    if (
      Math.abs(swipePosition.xEnd - swipePosition.xStart) >
        Math.abs(swipePosition.yEnd - swipePosition.yStart) &&
      Math.abs(swipePosition.xEnd - swipePosition.xStart) > thresholdPX
    ) {
      const direction =
        swipePosition.xEnd > swipePosition.xStart
          ? SwipeDirection.RIGHT
          : SwipeDirection.LEFT;
      setSwipeDirection(direction);
      if (onDirectionChange) {
        onDirectionChange(direction);
      }
    } else if (
      Math.abs(swipePosition.yEnd - swipePosition.yStart) > thresholdPX
    ) {
      const direction =
        swipePosition.yEnd > swipePosition.yStart
          ? SwipeDirection.DOWN
          : SwipeDirection.UP;
      setSwipeDirection(direction);
      if (onDirectionChange) {
        onDirectionChange(direction);
      }
    }
  }, [swipePosition.yEnd]);

  return { ...swipePosition, swipeDirection };
};
