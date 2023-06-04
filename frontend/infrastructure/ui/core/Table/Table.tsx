"use client";

import classNames from "classnames";

import { useSortableMechanism } from "./useSortableMechanism";
import {
  ColumnsConfig,
  TableConfig,
  TableDataItem,
  TABLE_QUERY_PARAM,
  TABLE_SORT_DIRECTION,
} from "./Table.types";

import styles from "./Table.module.scss";

type TableProps<DataItem extends TableDataItem> = {
  items: DataItem[];
  config: TableConfig<DataItem>;
  sortQueryParamName?: string;
  isLoading?: boolean;
};

export const Table = <DataItem extends TableDataItem>(
  props: TableProps<DataItem>
) => {
  const {
    items,
    config,
    sortQueryParamName = TABLE_QUERY_PARAM.SORT,
    isLoading,
  } = props;

  const columnsData = Object.entries(config.columns) as Entries<
    ColumnsConfig<DataItem>
  >;

  const { sortKey, sortDirection, handleSort } =
    useSortableMechanism(sortQueryParamName);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            {columnsData.map(([key, columnConfig]) => (
              <th
                key={key}
                onClick={
                  columnConfig?.isSortable ? () => handleSort(key) : undefined
                }
                style={{
                  cursor: columnConfig?.isSortable ? "pointer" : undefined,
                }}
                className={styles.tableHeadCell}
              >
                {columnConfig?.label}{" "}
                {sortKey === key && sortDirection
                  ? sortDirection === TABLE_SORT_DIRECTION.ASC
                    ? " ⇑"
                    : " ⇓"
                  : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={classNames(styles.tableBody, {
            [styles.tableBody__loading]: isLoading,
          })}
        >
          {items.map((item) => (
            <tr
              key={item.id}
              className={classNames({
                [styles.tableRow]: true,
                [styles.tableRow__clickable]: Boolean(config.onRowClick),
              })}
              onClick={() => config.onRowClick && config.onRowClick(item.id)}
            >
              {columnsData.map(([key, columnConfig]) => (
                <td key={key} className={styles.tableCell}>
                  {columnConfig?.value ? columnConfig.value(item) : item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
