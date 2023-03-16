"use client";

import { createContext, ReactNode, useContext } from "react";

import { useMainSidebarHandler } from "./useMainSidebarHandler";

type MainSidebarContextType = ReturnType<typeof useMainSidebarHandler>;

const MainSidebarContext = createContext<MainSidebarContextType | null>(null);

type MainSidebarContextProviderProps = {
  children: ReactNode;
};

export const useMainSidebar = () => {
  const mainSidebarContext = useContext(MainSidebarContext);

  if (!mainSidebarContext) {
    throw new Error("useMainSidebar hook is used outside a provider");
  }

  return mainSidebarContext;
};

export const MainSidebarContextProvider = ({
  children,
}: MainSidebarContextProviderProps) => {
  const values = useMainSidebarHandler();

  return (
    <MainSidebarContext.Provider value={values}>
      {children}
    </MainSidebarContext.Provider>
  );
};
