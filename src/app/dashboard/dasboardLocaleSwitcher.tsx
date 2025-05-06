"use client";

import { useRouter } from "next/navigation";
import { Locale, useLocale } from "next-intl";
import updateLocale from "./updateLocale";

export default function DashboardLocaleSwitcher() {
  const router = useRouter();

  async function action(data: FormData) {
    await updateLocale(data);

    router.refresh();
  }

  return ( 
    <form action={action} className="flex gap-3">
      <LocaleButton locale="en" />
      <LocaleButton locale="ja" />
      
    </form>
  );
}

function LocaleButton({ locale }: { locale: Locale }) {
  const curLocale = useLocale();

  return (
    <button
      className={curLocale === locale ? 'underline' : undefined}
      name="locale"
      type="submit"
      value={locale}
    >
      { locale.toUpperCase() }
    </button>
  );
}