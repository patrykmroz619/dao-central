"use client";

import { ComponentPropsWithoutRef } from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
} & ComponentPropsWithoutRef<"div">;

export const Pagination = (props: PaginationProps) => {
  const { currentPage, pageCount, onPageChange, className, ...restProps } =
    props;

  if (pageCount === 0) {
    return null;
  }

  return (
    <div className={className} {...restProps}>
      <ReactPaginate
        containerClassName={styles.container}
        pageClassName={styles.page}
        activeClassName={styles.activePage}
        breakClassName={styles.break}
        previousClassName={styles.previous}
        nextClassName={styles.next}
        pageRangeDisplayed={3}
        previousLabel="<"
        nextLabel=">"
        pageCount={pageCount}
        forcePage={currentPage - 1}
        onPageChange={({ selected }) => {
          onPageChange(selected + 1);
        }}
      />
    </div>
  );
};
