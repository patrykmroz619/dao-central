export type GetQueryParams<FilteredKeys extends string> = {
  page?: number;
  limit?: number;
  sortBy?: string | string[];
  search?: string;
  filter?: Partial<Record<FilteredKeys, string>>;
};
