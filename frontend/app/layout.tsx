import { Open_Sans } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";

import { GlobalProvider } from "modules/core/providers/GlobalProvider";
import "modules/core/styles/global.scss";

import styles from "./panel.module.scss";
import { PUBLIC_CONFIG } from "modules/core/config/public";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

type RootLayoutProps = {
  children: React.ReactNode;
};

if (PUBLIC_CONFIG.MODE_ENV === "test") {
  require("tests/mocks/http");
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={openSans.className}>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <body className={styles.body}>
        <GlobalProvider>{children}</GlobalProvider>
        <div id="modal" />
      </body>
    </html>
  );
}
