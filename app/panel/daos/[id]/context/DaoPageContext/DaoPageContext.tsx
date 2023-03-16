"use client";

import { createContext, ReactNode, useContext } from "react";
import { DaoData } from "shared/api/types/daoData.type";
import { useDaoPageData } from "./useDaoPageData";

type DaoPageContextType = ReturnType<typeof useDaoPageData>;

const DaoPageContext = createContext<DaoPageContextType | null>(null);

export const useDaoPageContext = () => {
  const context = useContext(DaoPageContext);

  if (!context) {
    throw new Error("The useDaoPageContext hook used outside of provider");
  }

  return context;
};

type DaoPageContextProviderProps = {
  children: ReactNode;
  daoData: DaoData;
};

export const DaoPageContextProvider = (props: DaoPageContextProviderProps) => {
  const { children, daoData } = props;

  const daoPageData = useDaoPageData(daoData);

  return (
    <DaoPageContext.Provider value={daoPageData}>
      {children}
    </DaoPageContext.Provider>
  );
};
