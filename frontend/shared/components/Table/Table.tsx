"use client";

import { QUERY_PARAM } from "shared/constants/queryParams";
import { SORT_DIRECTION } from "shared/constants/sortDirection";
import { useSortableMechanism } from "./useSortableMechanism";
import { ColumnsConfig, TableConfig, TableDataItem } from "./Table.types";
import styles from "./Table.module.scss";

type TableProps<DataItem extends TableDataItem> = {
  items: DataItem[];
  config: TableConfig<DataItem>;
  sortQueryParamName?: QUERY_PARAM;
};

export const Table = <DataItem extends TableDataItem>(
  props: TableProps<DataItem>
) => {
  const { items, config, sortQueryParamName = QUERY_PARAM.SORT } = props;

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
                  ? sortDirection === SORT_DIRECTION.ASC
                    ? " ⇑"
                    : " ⇓"
                  : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {items.map((item) => (
            <tr key={item.id} className={styles.tableRow}>
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
