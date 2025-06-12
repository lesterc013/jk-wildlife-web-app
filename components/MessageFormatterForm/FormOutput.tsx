import { Textarea } from "@heroui/input";
import { Skeleton } from "@heroui/skeleton";
import { Dispatch, SetStateAction } from "react";

import CopyButton from "../CopyButton";
import ClearButton from "../ClearButton";

interface FormOutputProps {
  formSubmittingState: boolean;
  setOutputValue: Dispatch<SetStateAction<string>>;
  outputValue: string;
}

/// Contains the elements to render in the FormOutput portion
export default function FormOutput({
  formSubmittingState,
  outputValue,
  setOutputValue,
}: FormOutputProps) {
  return (
    <>
      <div className="mt-8 flex flex-col gap-2 items-start md:w-full md:mt-0 md:pl-2">
        <Skeleton className="w-full rounded-lg" isLoaded={!formSubmittingState}>
          <Textarea
            className=""
            label="Formatted Message"
            labelPlacement="outside"
            minRows={7}
            value={outputValue}
            onValueChange={setOutputValue}
          />
        </Skeleton>

        <div className="w-full flex justify-between md:justify-start md:gap-2">
          <CopyButton
            isDisabled={formSubmittingState}
            valueToCopy={outputValue}
          />
          <ClearButton
            clearHandler={() => setOutputValue("")}
            isDisabled={formSubmittingState}
          />
        </div>
      </div>
    </>
  );
}
