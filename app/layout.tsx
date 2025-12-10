import type { Metadata } from "next";
import { Noto_Sans_JP, Montserrat } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "OGP画像生成ツール",
  description: "ブログ用のカバー画像兼OGP画像を生成するツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
