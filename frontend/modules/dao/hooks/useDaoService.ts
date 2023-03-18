import { useRef } from "react";

import { DaoService } from "../services/daoService";

export const useDaoService = () => {
  const daoServiceRef = useRef(new DaoService());

  return daoServiceRef.current;
};
