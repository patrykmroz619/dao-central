"use client";

import Image from "next/image";

import { COLOR_THEME } from "@/infrastructure/services/theme";
import { useTheme } from "@/infrastructure/services/theme/client";

import logo from "public/images/brand/logo.png";
import logoBlack from "public/images/brand/logo-black.png";

type AppLogoProps = {
  size: number;
};

export const AppLogo = (props: AppLogoProps) => {
  const { size } = props;

  const { theme } = useTheme();

  let src = null;

  switch (theme) {
    case COLOR_THEME.DARK:
      src = logo;
      break;
    case COLOR_THEME.LIGHT:
      src = logoBlack;
      break;
    default:
      src = logoBlack;
      break;
  }

  return <Image src={src} width={size} height={size} alt="DAO Central logo" />;
};
