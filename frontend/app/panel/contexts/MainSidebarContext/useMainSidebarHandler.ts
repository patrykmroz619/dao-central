import { useEffect, useRef } from "react";

import { useBoolean } from "shared/hooks/useBoolean";
import { useMediaQuery } from "shared/hooks/useMediaQuery";
import { SwipeDirection, useSwipe } from "shared/hooks/useSwipe";

export const useMainSidebarHandler = () => {
  const [isOpen, openSidebar, closeSidebar] = useBoolean(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const bodyRef = useRef<HTMLElement | null>(null);

  useSwipe(bodyRef, 100, (direction) => {
    switch (direction) {
      case SwipeDirection.LEFT:
        closeSidebar();
        break;
      case SwipeDirection.RIGHT:
        openSidebar();
        break;
    }
  });

  useEffect(() => {
    bodyRef.current = window.document.body;
  }, []);

  const isSidebarOpen = isDesktop || isOpen;

  return { isSidebarOpen, openSidebar, closeSidebar };
};