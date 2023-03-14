import { useState } from "react";

import { DaoData } from "shared/api/types/daoData.type";

export const useDaoPageData = (dao: DaoData) => {
  const [votings] = useState([]);

  return {
    votings,
    dao,
  };
};
