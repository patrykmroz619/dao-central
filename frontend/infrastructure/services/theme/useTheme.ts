import { useTheme as useNextTheme } from "next-themes";
import { useCallback, useMemo } from "react";
import { COLOR_THEME } from "./types";

export const useTheme = () => {
  const { theme: nextTheme, setTheme: setNextTheme } = useNextTheme();

  const setTheme = useCallback(
    (theme: COLOR_THEME) => setNextTheme(theme),
    [setNextTheme]
  );

  const theme = useMemo(() => {
    if (nextTheme === COLOR_THEME.DARK) {
      return COLOR_THEME.DARK;
    } else {
      return COLOR_THEME.LIGHT;
    }
  }, [nextTheme]);

  return {
    theme,
    setTheme,
  };
};
