import "styles/global.scss";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}
