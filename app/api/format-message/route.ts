// fetch("/api/format-message" {*insert the method and headers etc etc*})
import OpenAI from "openai";

import { MessageFormatterFormShape } from "@/lib/validation/form-validation";
import promptJson from "@/lib/prompt/prompt-json";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(request: Request) {
  const body: MessageFormatterFormShape = await request.json();
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    instructions: JSON.stringify(promptJson),
    input: `${body.messageToFormat}`,
  });

  return Response.json(response.output_text);
}
