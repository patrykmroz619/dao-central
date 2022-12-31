"use client";

import { useSession } from "next-auth/react";

export const User = () => {
  const { data, status } = useSession();

  return <div>{JSON.stringify(data)}</div>;
};
