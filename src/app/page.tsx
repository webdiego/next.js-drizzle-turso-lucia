import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/lucia/lucia";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Spotlight } from "@/components/Spotlight";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default async function Home() {
  const githubUrl =
    "https://github.com/webdiego/next.js-drizzle-turso-lucia.git";

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
      <div className="p-4 max-w-5xl mx-auto relative z-10 w-full pt-20 md:pt-0 flex flex-col items-center justify-center">
        <h1 className="text-5xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          The template for building fullstack applications
        </h1>

        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          This is a template for building fullstack applications with{" "}
          <span className="font-bold">Next.js, </span>
          <span className="font-bold">Lucia, </span>
          <span className="font-bold">Drizzle, </span>and
          <span className="font-bold"> Turso</span>.
        </p>
        <div className="w-94 my-5">
          <CopyToClipboard text={`git clone ${githubUrl}`} />
          <div className="flex items-center justify-center">
            <Button
              size="sm"
              variant={"outline"}
              asChild
              className="self-center mt-2"
            >
              <a href={githubUrl}>
                <GitHubLogoIcon className="mr-1 h-5 w-5" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center ">
          <p className="text-white font-semibold text-sm text-center">
            Just try the template, sign up and start building your app.
          </p>
          <div className="flex items-center space-x-2 mt-5">
            <Link href={"/sign-up"}>
              <Button variant={"outline"}>Sign up</Button>
            </Link>
            <p className="text-white text-xs">or</p>
            <Link href={"/sign-in"}>
              <Button variant={"outline"}>Sign in</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
