"use client";

import { createContext, ReactNode, useContext } from "react";

import { DaoData } from "modules/dao/types/daoData.type";
import { useDaoDetailsData } from "./useDaoDetailsData";

type DaoDetailsDataType = ReturnType<typeof useDaoDetailsData>;

const DaoDetails = createContext<DaoDetailsDataType | null>(null);

export const useDaoDetails = () => {
  const context = useContext(DaoDetails);

  if (!context) {
    throw new Error("The useDaoDetails hook used outside of provider");
  }

  return context;
};

type DaoDetailsProviderProps = {
  children: ReactNode;
  daoData: DaoData;
};

export const DaoDetailsProvider = (props: DaoDetailsProviderProps) => {
  const { children, daoData } = props;

  const daoDetailsData = useDaoDetailsData(daoData);

  return (
    <DaoDetails.Provider value={daoDetailsData}>{children}</DaoDetails.Provider>
  );
};
