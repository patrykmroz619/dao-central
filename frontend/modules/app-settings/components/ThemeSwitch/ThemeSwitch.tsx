"use client";

import { ChangeEvent } from "react";
import { Sun, Moon } from "react-feather";

import { IconSwitch } from "@/infrastructure/ui/core";
import { COLOR_THEME, useTheme } from "@/infrastructure/services/theme";
import { useIsBrowser } from "@/infrastructure/helpers/hooks/useIsBrowser";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (event: ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked ? COLOR_THEME.LIGHT : COLOR_THEME.DARK);
  };

  const isBrowser = useIsBrowser();
  // Update theme only on client site to avoid props mismatch during hydration
  const isLight = theme === COLOR_THEME.LIGHT && isBrowser;

  return (
    <IconSwitch
      id="theme-switch"
      checkedIcon={<Sun />}
      uncheckedIcon={<Moon />}
      checked={isLight}
      onChange={toggleTheme}
    />
  );
};
