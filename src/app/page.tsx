import { Button } from "~/components/ui/button";
import Link from "next/link";
import { SignOutButton } from "~/components/ui/auth/signOutButton";
import { 
  Card,
  CardFooter, 
  CardHeader, 
  CardTitle, 
} from "~/components/ui/card";
import { getCurrentUser } from "~/auth/currentUser";

export default async function HomePage() {

  const fullUser = await getCurrentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {fullUser == null ? (
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>User:  {fullUser.userId}</CardTitle>
          </CardHeader>
          <CardFooter className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/private">Private Page</Link>
            </Button>
            {fullUser.role?.includes("admin") && (
              <Button asChild variant="outline">
                <Link href="/admin">Admin Page</Link>
              </Button>
            )}
            <SignOutButton />
            
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
