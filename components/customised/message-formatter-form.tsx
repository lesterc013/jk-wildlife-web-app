"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input } from "@heroui/input";

import {
  messageFormatterFormSchema,
  MessageFormatterFormShape,
} from "@/lib/validation/form-validation";

export default function MessageFormatterForm() {
  // Get necessary RHF functions and properties
  const { handleSubmit, control } = useForm<MessageFormatterFormShape>({
    resolver: zodResolver(messageFormatterFormSchema),
    // default values needed?
  });

  // Create what should happen when form is submitted
  const onSubmitForm: SubmitHandler<MessageFormatterFormShape> = (data) => {
    // Package the data
    // Call the api
    // Get the response and update the Output field
    console.log("Form submitted", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Controller
        control={control}
        name="messageToFormat"
        render={({ field, fieldState }) => (
          <Input
            ref={field.ref}
            isRequired
            errorMessage={fieldState.error?.message}
            label="Message to Format"
            name="messageToFormat"
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
      />
      <button>Submit</button>
    </form>
  );
}
