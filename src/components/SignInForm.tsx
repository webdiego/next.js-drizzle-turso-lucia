"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInSchema } from "../types";
import { signIn } from "@/app/actions/auth.actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import FormButton from "@/components/FormButton";
import { useState } from "react";

export function SignInForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    setIsPending(true);
    const res = await signIn(values);
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
      setIsPending(false);
    } else if (res.success) {
      toast({
        variant: "default",
        description: "Signed in successfully",
      });
      setTimeout(() => {
        setIsPending(false);
        router.push("/profile");
      }, 5000);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  autoComplete="current-password"
                  placeholder="****"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton
          isPending={isPending}
          variant="default"
          defaultText="Sign in"
          pendingText="Signing in..."
        />
      </form>
    </Form>
  );
}
