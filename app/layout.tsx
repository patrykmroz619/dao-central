import { Open_Sans } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";

import { GlobalProvider } from "shared/features/GlobalProvider";
import styles from "./panel.module.scss";
import "shared/styles/global.scss";

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
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
