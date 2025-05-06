import { ConvexClientProvider } from "~/app/ConvexClientProvider";
import TopNav from "./_components/navBar";
import { GeistSans } from "geist/font/sans";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";


export default async function AdminLayout({ children }: { children: React.ReactNode } ) {
  const locale = await getLocale();

  return ( 
    <html lang={locale} className={`${GeistSans.variable}`}>
      <body>
        <NextIntlClientProvider>
          <TopNav />
          <ConvexClientProvider>
            <div className="container mx-auto pt-8">{ children }</div>
          </ConvexClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}