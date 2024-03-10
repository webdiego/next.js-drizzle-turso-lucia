import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/lucia/lucia";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions/auth.actions";
import Link from "next/link";
import { Spotlight } from "@/components/Spotlight";
export default async function Home() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/profile");
  }

  return (
    <div className="h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          The template that has it all
        </h1>

        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          This is a template for building fullstack applications with{" "}
          <span className="font-bold">Next.js, </span>
          <span className="font-bold">Lucia, </span>
          <span className="font-bold">Drizzle, </span>and
          <span className="font-bold"> Turso</span>.
        </p>
        <div className="mt-5 space-x-5 ">
          <Link href={"/sign-up"}>
            <Button variant={"outline"} type="submit">
              Sign up
            </Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button variant={"outline"} type="submit">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
