"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Form } from "@heroui/form";

import ClearButton from "../ClearButton";

import FormOutput from "./FormOutput";

import {
  messageFormatterFormSchema,
  MessageFormatterFormShape,
} from "@/lib/validation/form-validation";

export default function MessageFormatterPage() {
  const [outputValue, setOutputValue] = useState("");

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

      setOutputValue(formattedMessage);
    } catch (error) {
      console.log("Error in onSubmit form: " + error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-11/12 md:flex-row md:items-end md:w-full">
        <Form
          className="md:w-full md:pr-2"
          onSubmit={handleSubmit(onSubmitForm)}
        >
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
          <div className="w-full flex justify-between md:justify-start md:gap-2">
            {formState.isSubmitting ? (
              <Button isLoading color="primary" radius="full" size="sm">
                Loading
              </Button>
            ) : (
              <Button
                color="primary"
                radius="full"
                size="sm"
                startContent={<SendHorizonal size={15} />}
                type="submit"
              >
                Format
              </Button>
            )}
            <ClearButton
              clearHandler={() => setValue("messageToFormat", "")}
              isDisabled={formState.isSubmitting}
            />
          </div>
        </Form>

        <FormOutput
          formSubmittingState={formState.isSubmitting}
          {...{
            outputValue,
            setOutputValue,
          }}
        />
      </div>
    </>
  );
}
