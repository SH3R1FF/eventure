// Make sure this is in a server component file
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
// export default async function Home() {
export default function Home() {

  return (
    <div className="text-center container my-4 mx-auto">
      <h1 className="text-3xl mb-4">Fancy Home Page</h1>
      <div className="flex gap-2 justify-center">
        <Link href="/events">
          <Button  variant="default">
            Sign in
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button  variant="default">   
            Sign up
          </Button>
        </Link>
      </div>
      <div className="pt-4">
        <UserButton />
      </div>
    </div>
  );
}
