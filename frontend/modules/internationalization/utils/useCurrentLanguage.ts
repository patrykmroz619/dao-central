"use client";

import { useParams } from "next/navigation";
import { Language } from "../types";

export const useCurrentLanguage = () => {
  const params = useParams();

  return params?.lang as Language;
};
