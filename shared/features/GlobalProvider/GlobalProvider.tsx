"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import { Web3Provider } from "./Web3Provider";

type GlobalProviderProps = {
  children: React.ReactNode;
};

export function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <SessionProvider>
      <Web3Provider>{children}</Web3Provider>
      <ToastContainer />
    </SessionProvider>
  );
}
