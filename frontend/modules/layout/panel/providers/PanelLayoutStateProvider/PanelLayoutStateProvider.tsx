"use client";

import { createContext, ReactNode, useContext } from "react";

import { usePanelLayoutStateHandler } from "./usePanelLayoutStateHandler";

type PanelLayoutStateType = ReturnType<typeof usePanelLayoutStateHandler>;

const PanelLayoutState = createContext<PanelLayoutStateType | null>(null);

type PanelLayoutStateProviderProps = {
  children: ReactNode;
};

export const usePanelLayoutState = () => {
  const panelLayoutState = useContext(PanelLayoutState);

  if (!panelLayoutState) {
    throw new Error("usePanelLayoutState hook is used outside a provider");
  }

  return panelLayoutState;
};

export const PanelLayoutStateProvider = ({
  children,
}: PanelLayoutStateProviderProps) => {
  const values = usePanelLayoutStateHandler();

  return (
    <PanelLayoutState.Provider value={values}>
      {children}
    </PanelLayoutState.Provider>
  );
};
