import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/lucia/auth.lucia";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions/auth.actions";

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/sign-up");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Protected route</p>
      <p>{JSON.stringify(user)}</p>
      <form action={signOut}>
        <Button type="submit">Sign out</Button>
      </form>
    </main>
  );
}
