"use client";

import { InternationalizedProps } from "@/infrastructure/internationalization/types";
import { Pagination } from "@/infrastructure/ui/core/Pagination";

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
} & InternationalizedProps;

export const DaosList = (props: DaosListProps) => {
  const { initialData, itemsPerPage, pageCount, filter, lang } = props;

  const { daos, page, setPage, isLoading } = useDaoList(
    initialData,
    itemsPerPage,
    filter
  );

  return (
    <div className={styles.wrapper}>
      <DaoTable daos={daos} isLoading={isLoading} lang={lang} />
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        pageCount={pageCount}
        className={styles.pagination}
      />
    </div>
  );
};
