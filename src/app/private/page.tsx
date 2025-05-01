import { Button } from "~/components/ui/button";
import Link from "next/link";
import { RoleSelector } from "./roleSelector";
import { getCurrentUser } from "~/auth/currentUser";
import { api } from "~/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";


export default async function PrivatePage() {
  
  const currentUser = await getCurrentUser({ redirectIfNotFound: true })  
  const userRoles = await fetchQuery(api.queries.staff.getUserRoles, { id: currentUser.userId })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-8">Private: {currentUser.role}</h1>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <RoleSelector userRoles={userRoles} sessionRole={currentUser.role} />
      </div>
    </div>
  )
}