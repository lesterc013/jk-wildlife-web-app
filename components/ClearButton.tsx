import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";

interface ClearButtonProps {
  clearHandler: () => void;
  isDisabled: boolean;
}

export default function ClearButton({
  clearHandler,
  isDisabled,
}: ClearButtonProps) {
  return (
    <Button
      color="default"
      isDisabled={isDisabled}
      radius="lg"
      size="sm"
      startContent={<Trash2 size={15} />}
      type="button"
      onPress={clearHandler}
    >
      Clear
    </Button>
  );
}
