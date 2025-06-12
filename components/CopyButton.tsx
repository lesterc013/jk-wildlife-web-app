"use client";

import { Button } from "@heroui/button";
import copy from "copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  isDisabled: boolean;
  valueToCopy: string;
}

export default function CopyButton({
  isDisabled,
  valueToCopy,
}: CopyButtonProps) {
  const [isCopiedToClipboardPressed, setCopiedToClipboardPressed] =
    useState(false);

  const onCopyButtonPressed = () => {
    const success = copy(valueToCopy);

    if (success) {
      setCopiedToClipboardPressed(true);
      setTimeout(() => setCopiedToClipboardPressed(false), 3000);
    } else {
      console.error("Copy failed");
    }
  };

  return (
    <Button
      color="primary"
      isDisabled={isDisabled}
      radius="full"
      size="sm"
      startContent={
        isCopiedToClipboardPressed ? <Check size={15} /> : <Copy size={15} />
      }
      onPress={onCopyButtonPressed}
    >
      Copy
    </Button>
  );
}
