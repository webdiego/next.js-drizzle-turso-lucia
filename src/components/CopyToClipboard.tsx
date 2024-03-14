"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const CopyToClipboard = ({ text }: { text: string }) => {
  const { toast } = useToast();

  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      action: <CheckIcon />,
    });
  };
  return (
    <div className="flex justify-center gap-3">
      <Input
        readOnly
        value={text}
        className="bg-slate-300 text-muted-foreground"
      />
      <Button size="icon" variant={"outline"} onClick={() => copyToClipboard()}>
        {copied ? (
          <CheckIcon
            className={cn(
              copied ? "opacity-100" : "opacity-0",
              "h-5 w-5 transition-opacity duration-500"
            )}
          />
        ) : (
          <CopyIcon className="h-5 w-5 text-gray-900" />
        )}
      </Button>
    </div>
  );
};
