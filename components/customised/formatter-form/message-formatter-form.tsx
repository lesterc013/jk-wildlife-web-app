"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { useState } from "react";
import { SendHorizonal, Trash2, Copy, Check } from "lucide-react";

import {
  messageFormatterFormSchema,
  MessageFormatterFormShape,
} from "@/lib/validation/form-validation";
import { Form } from "@heroui/form";
import copy from "copy-to-clipboard";

export default function MessageFormatterForm() {
  const [outputValue, setOutputvalue] = useState("");
  const [copiedToClipboardPressed, setcopiedToClipboardPressed] =
    useState(false);

  // Get necessary RHF functions and properties
  const { handleSubmit, control, setValue, formState } =
    useForm<MessageFormatterFormShape>({
      resolver: zodResolver(messageFormatterFormSchema),
      mode: "onChange",
      // default values needed?
    });

  // Create what should happen when form is submitted
  const onSubmitForm: SubmitHandler<MessageFormatterFormShape> = async (
    data
  ) => {
    // Package the data into JSON form so it can be POSTed
    const requestBody = JSON.stringify(data);

    try {
      const response = await fetch("/api/format-message", {
        method: "POST",
        body: requestBody,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // UnJSON the return
      const formattedMessage = await response.json();

      setOutputvalue(formattedMessage);
      // Set the state of the output textarea
    } catch (error) {
      // TODO: Post a toast that some error happened
      console.log("Error in onSubmit form: " + error);
    }
    // Get the response and update the Output field
    // console.log("Form submitted", data);
  };

  const onCopyButtonPressed = () => {
    const success = copy(outputValue);

    if (success) {
      setcopiedToClipboardPressed(true);
      setTimeout(() => setcopiedToClipboardPressed(false), 3000);
    } else {
      console.error("Copy failed");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-11/12">
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <Controller
            control={control}
            name="messageToFormat"
            render={({ field, fieldState }) => (
              <>
                <Textarea
                  ref={field.ref}
                  isRequired
                  errorMessage={fieldState.error?.message}
                  isDisabled={formState.isSubmitting}
                  isInvalid={fieldState.invalid}
                  label="Paste WhatsApp Message Here!"
                  labelPlacement="outside"
                  minRows={7}
                  name="messageToFormat"
                  validationBehavior="aria"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                />
              </>
            )}
          />
          <div className="w-full flex justify-between">
            {formState.isSubmitting ? (
              <Button isLoading size="sm" color="primary" radius="full">
                Loading
              </Button>
            ) : (
              <Button
                type="submit"
                size="sm"
                color="primary"
                radius="full"
                startContent={<SendHorizonal size={15} />}
              >
                Format
              </Button>
            )}
            <Button
              type="button"
              size="sm"
              color="default"
              startContent={<Trash2 size={15} />}
              radius="lg"
              isDisabled={formState.isSubmitting}
              onPress={() => setValue("messageToFormat", "")}
            >
              Clear
            </Button>
          </div>
        </Form>

        <div className="mt-8 flex flex-col gap-2 items-start">
          <Skeleton
            className="w-full rounded-lg"
            isLoaded={!formState.isSubmitting}
          >
            <Textarea
              className=""
              label="Formatted Message"
              labelPlacement="outside"
              minRows={7}
              value={outputValue}
              onValueChange={setOutputvalue}
            />
          </Skeleton>
          <div className="w-full flex justify-between">
            {copiedToClipboardPressed ? (
              <Button
                size="sm"
                color="primary"
                startContent={<Check size={15} />}
                radius="full"
              >
                Copied!
              </Button>
            ) : (
              <Button
                size="sm"
                color="primary"
                startContent={<Copy size={15} />}
                radius="full"
                onPress={onCopyButtonPressed}
                isDisabled={formState.isSubmitting}
              >
                Copy
              </Button>
            )}
            <Button
              type="button"
              size="sm"
              color="default"
              startContent={<Trash2 size={15} />}
              radius="lg"
              isDisabled={formState.isSubmitting}
              onPress={() => setOutputvalue("")}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
