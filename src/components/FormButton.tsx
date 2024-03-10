"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function FormButton({
  variant = "outline",
  pendingText,
  defaultText,
}: {
  variant: "outline" | "default";
  pendingText: string;
  defaultText: string;
}) {
  const { pending } = useFormStatus();
  console.log("Pending status", pending, pendingText);
  return (
    <Button variant={variant} type="submit" disabled={pending}>
      {pending ? pendingText : defaultText}
    </Button>
  );
}
