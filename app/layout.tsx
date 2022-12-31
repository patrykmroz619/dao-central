import { Open_Sans } from "@next/font/google";

import { GlobalProvider } from "shared/features";
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
      <body>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
