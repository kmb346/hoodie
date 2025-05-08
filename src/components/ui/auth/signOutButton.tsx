"use client"

import { Button } from "~/components/ui/button"
import { signOut } from "~/auth/actions"
import { useTranslations } from "next-intl";

export function SignOutButton() {
  const t = useTranslations("dashboard.general")

  return (
    <Button variant="destructive" onClick={async () => await signOut()}>
      {t("signout_button")}
    </Button>
  )
}