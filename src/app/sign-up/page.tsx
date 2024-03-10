import { SignUpForm } from "@/components/SignUpForm";
import { validateRequest } from "@/lib/lucia/lucia";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const { user } = await validateRequest();

  if (user) {
    return redirect("/profile");
  }

  return (
    <div className="w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:p-8 mx-2">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Create a Free Account
      </h2>
      <SignUpForm />
    </div>
  );
}
