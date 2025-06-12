import type { Metadata } from "next";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { Header } from "./layout/Header";
import "./globals.css";
import Providers from "./Providers";
import ServerAuthProvider from "./providers/ServerAuthProvider";

export const metadata: Metadata = {
  title: "ChatHub",
  description: "A simple chat room application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ServerAuthProvider />
          <Header />
          <main className="flex-grow">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
