import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/lucia/lucia";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions/auth.actions";
import Link from "next/link";
export default async function Home() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/profile");
  }

  return (
    <main className="flex max-w-xl mx-auto min-h-screen flex-col items-center justify-center text-center ">
      <h1 className="text-3xl sm:text-5xl font-bold">
        Welcome to next fullstack template
      </h1>
      <p className="mt-4 max-w-sm">
        This is a template for building fullstack applications with{" "}
        <span className="font-bold">Next.js, </span>
        <span className="font-bold">Lucia, </span>
        <span className="font-bold">Drizzle, </span>and
        <span className="font-bold"> Turso</span>.
      </p>
      <div className="mt-5 space-x-5 ">
        <Link href={"/sign-up"}>
          <Button type="submit">Sign up</Button>
        </Link>
        <Link href={"/sign-in"}>
          <Button type="submit">Sign in</Button>
        </Link>
      </div>
    </main>
  );
}
