"use client";

import { useState } from "react";

export const useProposalsFetcher = () => {
  const [proposals] = useState(null);

  return { proposals };
};
