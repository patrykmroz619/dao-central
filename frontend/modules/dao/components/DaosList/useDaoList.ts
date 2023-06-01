"use client";

import { useEffect, useState } from "react";

import { getErrorMessage } from "@/infrastructure/helpers/utils/getErrorMessage";

import { DaoData } from "../../types/daoData.type";
import { useDaoService } from "../../hooks/useDaoService";
import { DaosListFilter } from "./DaosList";

export const useDaoList = (
  initialData: DaoData[],
  itemsPerPage: number,
  filter?: DaosListFilter
) => {
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
        filter,
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
  }, [page, itemsPerPage, filter]);

  return {
    daos,
    page,
    setPage,
    isLoading,
    error,
  };
};
