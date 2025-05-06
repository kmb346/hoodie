import "~/styles/globals.css";

import { type Metadata } from "next";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "Hoodie for schools",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextIntlClientProvider>
      <ConvexClientProvider>
        {children}
      </ConvexClientProvider>
    </NextIntlClientProvider>
  );
}
