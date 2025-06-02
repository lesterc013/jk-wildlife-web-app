"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

import {
  messageFormatterFormSchema,
  MessageFormatterFormShape,
} from "@/lib/validation/form-validation";
import Output from "./output";
import { useState } from "react";

export default function MessageFormatterForm() {
  const [outputValue, setOutputvalue] = useState("");

  // Get necessary RHF functions and properties
  const { handleSubmit, control } = useForm<MessageFormatterFormShape>({
    resolver: zodResolver(messageFormatterFormSchema),
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
    console.log("Form submitted", data);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-11/12 mt-12">
        <form onSubmit={handleSubmit(onSubmitForm)} className="w-full">
          <Controller
            control={control}
            name="messageToFormat"
            render={({ field, fieldState }) => (
              <Textarea
                ref={field.ref}
                isRequired
                errorMessage={fieldState.error?.message}
                label="Message to Format"
                labelPlacement="outside"
                name="messageToFormat"
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                className="mb-4"
              />
            )}
          />
          <Button type="submit">Format!</Button>
        </form>
        <Output output={outputValue} />
      </div>
    </>
  );
}
