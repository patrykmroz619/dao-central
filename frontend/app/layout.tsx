import { Open_Sans } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";

import { RegisterHttpMocks } from "tests/mocks/http";
import { GlobalProvider } from "modules/core/providers/GlobalProvider";
import "modules/core/styles/global.scss";

import styles from "./Panel.module.scss";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={openSans.className}>
      <head>
        <meta name="viewport" content="width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json?version=1" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#f1f7ff" />
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <body className={styles.body}>
        <RegisterHttpMocks />
        <GlobalProvider>{children}</GlobalProvider>
        <div id="modal" />
      </body>
    </html>
  );
}
