import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/lucia/lucia";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions/auth.actions";
import { TargetIcon } from "@radix-ui/react-icons";
import FormButton from "@/components/FormButton";
export default async function ProfilePage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <div className="bg-white px-2 py-1 rounded-lg flex items-center">
        <TargetIcon className="w-4 h-4 mr-2" />
        <p className="font-semibold text-sm">Protected route</p>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-white">
          Welcome {user.username}
        </h1>
        <p className="text-white text-center">
          You can now access protected routes
        </p>
      </div>
      <form action={signOut}>
        <FormButton
          variant="outline"
          defaultText="Sign out"
          pendingText="Signing out..."
        />
      </form>
    </main>
  );
}
