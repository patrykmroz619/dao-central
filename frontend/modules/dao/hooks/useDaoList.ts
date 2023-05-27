"use client";

import { getErrorMessage } from "modules/common/utils/getErrorMessage";
import { useEffect, useState } from "react";
import { DaoData } from "../types/daoData.type";
import { useDaoService } from "./useDaoService";

export const useDaoList = (initialData: DaoData[], itemsPerPage: number) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [daos, setDaos] = useState(initialData);

  const daoService = useDaoService();

  const fetchDaos = async (page: number, limit: number) => {
    try {
      setIsLoading(true);
      const { data } = await daoService.getDaosList({
        page,
        limit,
      });

      setDaos(data);
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDaos(page, itemsPerPage);
  }, [page, itemsPerPage]);

  return {
    daos,
    page,
    setPage,
    isLoading,
    error,
  };
};
