"use client";

import { Sun, Moon } from "react-feather";

import { IconSwitch } from "@/infrastructure/ui/core";
import { COLOR_THEME, useTheme } from "@/infrastructure/services/theme";
import { ChangeEvent } from "react";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    setTheme(event.target.checked ? COLOR_THEME.LIGHT : COLOR_THEME.DARK);
  };

  const isLight = theme === COLOR_THEME.LIGHT;

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
