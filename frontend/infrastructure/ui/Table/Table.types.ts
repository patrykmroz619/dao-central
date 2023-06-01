import { ReactNode } from "react";

export type TableDataItem = {
  id: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type SingleColumnConfig<DataItem extends TableDataItem> = {
  label: ReactNode;
  isSortable?: boolean;
  value?: (item: DataItem) => ReactNode;
};

export type ColumnsConfig<DataItem extends TableDataItem> = Partial<
  Record<string, SingleColumnConfig<DataItem>>
>;

export type TableConfig<DataItem extends TableDataItem> = {
  columns: ColumnsConfig<DataItem>;
  onRowClick?: (itemId: DataItem["id"]) => void;
};
