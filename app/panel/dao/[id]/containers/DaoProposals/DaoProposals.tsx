"use client";

import { useProposalsFetcher } from "./useProposalsFetcher";

export const DaoProposals = () => {
  const { proposals } = useProposalsFetcher();

  return proposals;
};
