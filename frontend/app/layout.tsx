import { Open_Sans } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";

import { RegisterHttpMocks } from "tests/mocks/http";
import { GlobalProvider } from "modules/core/providers/GlobalProvider";
import "modules/core/styles/global.scss";

import styles from "./panel.module.scss";

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
      </head>
      <body className={styles.body}>
        <RegisterHttpMocks />
        <GlobalProvider>{children}</GlobalProvider>
        <div id="modal" />
      </body>
    </html>
  );
}
