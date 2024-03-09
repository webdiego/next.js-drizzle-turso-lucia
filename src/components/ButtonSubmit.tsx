import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function ButtonSubmit() {
  const { pending } = useFormStatus();
  return (
    <Button type={"submit"} className="w-full mt-2 " disabled={pending}>
      {pending ? "Adding..." : "Add"}
    </Button>
  );
}
