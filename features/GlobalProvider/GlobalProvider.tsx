"use client";

import { Web3Provider } from "./Web3Provider";

type GlobalProviderProps = {
  children: React.ReactNode;
};

export function GlobalProvider({ children }: GlobalProviderProps) {
  return <Web3Provider>{children}</Web3Provider>;
}
