"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { COLOR_THEME } from "./types";

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;

  return (
    <NextThemeProvider themes={[COLOR_THEME.DARK, COLOR_THEME.LIGHT]}>
      {children}
    </NextThemeProvider>
  );
};
