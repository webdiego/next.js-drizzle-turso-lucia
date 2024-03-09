import { db } from "../db/index";
import { notes } from "../db/schema/notes";
import Notes from "@/components/Notes";
import Form from "@/components/Form";
import Image from "next/image";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default async function Home() {
  const allNotes = await db.select().from(notes).all();
  const githubUrl = "https://github.com/webdiego/drizzle-turso.git";
  return (
    <div className="relative flex items-center h-screen ">
      <div className="bg-pattern absolute top-0 left-0 w-full h-screen -z-10" />
      <div className="fixed top-0 left-0 w-screen h-screen">
        <Image
          src="/bg.webp"
          alt="background"
          quality="100"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="relative max-w-md py-10 px-6 mx-4 sm:mx-auto backdrop-blur-[1px] rounded-3xl">
        <div className="absolute top-0 left-0 w-full h-full -z-10 rounded-7xl opacity-50 " />
        <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] ">
          Template Next.js + Drizzle + Turso + Shadcn
        </h1>
        <p className="text-center  mt-2">
          This is a template for building a fullstack web application.
        </p>
        <div className="my-10">
          <div className="mx-auto ">
            <CopyToClipboard text={"git clone " + githubUrl} />
          </div>
          <div className="flex items-center justify-center">
            <Button size="default" asChild className="self-center mt-2">
              <a href={githubUrl}>
                <GitHubLogoIcon className="mr-1 h-5 w-5" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
        <Form />
        <Notes notes={allNotes} />
      </div>
    </div>
  );
}
