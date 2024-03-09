import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function ButtonDelete() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="destructive"
      className="w-full"
      disabled={pending}
    >
      {pending ? "Deleting..." : "Delete"}
    </Button>
  );
}
