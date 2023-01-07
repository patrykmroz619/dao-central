import { useCallback, useState } from "react";

export const useBoolean = (defaultValue?: boolean) => {
  const [value, setValue] = useState(Boolean(defaultValue));

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((x) => !x), []);

  return [value, setTrue, setFalse, toggle] as const;
};
