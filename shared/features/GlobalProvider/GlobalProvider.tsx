"use client";

import { SessionProvider } from "next-auth/react";
import { Web3Provider } from "./Web3Provider";

type GlobalProviderProps = {
  children: React.ReactNode;
};

export function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <SessionProvider>
      <Web3Provider>{children}</Web3Provider>
    </SessionProvider>
  );
}
