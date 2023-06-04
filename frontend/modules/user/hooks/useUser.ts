"use client";

import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return {
      isLoading: false,
      user: session.user,
    };
  }

  if (status === "unauthenticated") {
    return {
      isLoading: false,
      user: null,
    };
  }

  if (status === "loading") {
    return {
      isLoading: true,
      user: null,
    };
  }
};
