import { Textarea } from "@heroui/input";

export default function Output({ output }: { output: string }) {
  return (
    <Textarea
      className="mt-4 md:mt-0"
      label="Formatted Output"
      labelPlacement="outside"
      value={output}
    />
  );
}
