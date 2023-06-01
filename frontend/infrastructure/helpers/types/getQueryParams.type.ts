export type GetQueryParams<FilterSchema extends object> = {
  page?: number;
  limit?: number;
  sortBy?: string | string[];
  search?: string;
  filter?: Partial<FilterSchema>;
};
