"use client";

import { Pagination } from "modules/common/components/Pagination";
import { useDaoList } from "modules/dao/components/DaosList/useDaoList";
import { DaoData } from "modules/dao/types/daoData.type";
import { DaoTable } from "../DaoTable";

import styles from "./DaosList.module.scss";

export type DaosListFilter = {
  owner: {
    walletAddress: string;
  };
};

type DaosListProps = {
  initialData: DaoData[];
  itemsPerPage: number;
  pageCount: number;
  filter?: DaosListFilter;
};

export const DaosList = (props: DaosListProps) => {
  const { initialData, itemsPerPage, pageCount, filter } = props;

  const { daos, page, setPage, isLoading } = useDaoList(
    initialData,
    itemsPerPage,
    filter
  );

  return (
    <div className={styles.wrapper}>
      <DaoTable daos={daos} isLoading={isLoading} />
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        pageCount={pageCount}
        className={styles.pagination}
      />
    </div>
  );
};