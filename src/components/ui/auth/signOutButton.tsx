"use client"

import { Button } from "~/components/ui/button"
import { signOut } from "~/auth/actions"

export function SignOutButton() {
  return (
    <Button variant="destructive" onClick={async () => await signOut()}>
      Log Out
    </Button>
  )
}