import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { dir } from "i18next";

import { RegisterHttpMocks } from "tests/mocks/http";
import { GlobalProvider } from "modules/core/providers/GlobalProvider";
import { languages } from "@/infrastructure/internationalization/settings";
import { InternationalizedPageProps } from "@/infrastructure/internationalization/types";
import { ThemeProvider } from "@/infrastructure/services/theme/ThemeProvider";

import "@/infrastructure/styles/global.scss";
import styles from "./Panel.module.scss";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const generateStaticParams = () => {
  return languages.map((lang) => ({ lang }));
};

type RootLayoutProps = {
  children: React.ReactNode;
} & InternationalizedPageProps;

export const generateMetadata = async (
  props: RootLayoutProps
): Promise<Metadata> => {
  const {
    params: { lang },
  } = props;

  let description;

  switch (lang) {
    case "pl":
      description =
        "Zdecentralizowana aplikacja zasilana technologią blockchain do tworzenia oraz zarządzania DAO (zdecentralizowanymi organizacjami autonomicznymi).";
      break;
    case "en":
      description =
        "The decentralized application powered by blockchain technology for creating and managing DAOs (decentralized autonomous organizations).";
      break;
  }

  return {
    title: {
      default: "DAO Central",
      template: "DAO Central - %s",
    },
    description,
    manifest: "/manifest.json?version=1",
    themeColor: "#ffffff",
    generator: "Next.js",
    applicationName: "DAO Central",
    authors: {
      name: "Patryk Mróz",
      url: "https://patrykmroz.pl",
    },
    keywords: ["DAO", "Blockchain", "NFT", "Decentralized organizations"],
    referrer: "origin-when-cross-origin",
    icons: {
      icon: [
        {
          url: "/favicons/favicon-32x32.png",
          sizes: "32x32",
        },
        {
          url: "/favicons/favicon-16x16.png",
          sizes: "16x16",
        },
      ],
      apple: "/favicons/apple-touch-icon.png",
      other: [
        {
          rel: "mask-icon",
          url: "/favicons/safari-pinned-tab.svg",
        },
      ],
    },
    other: {
      "msapplication-TileColor": "#f1f7ff",
    },
  };
};

export default function RootLayout(props: RootLayoutProps) {
  const {
    children,
    params: { lang },
  } = props;

  return (
    <html className={openSans.className} lang={lang} dir={dir(lang)}>
      <body className={styles.body}>
        <RegisterHttpMocks />
        <ThemeProvider>
          <GlobalProvider>{children}</GlobalProvider>
          <div id="modal" />
        </ThemeProvider>
      </body>
    </html>
  );
}
