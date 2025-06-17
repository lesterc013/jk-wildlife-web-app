// fetch("/api/format-message" {*insert the method and headers etc etc*})
import OpenAI from "openai";

import { MessageFormatterFormShape } from "@/lib/validation/form-validation";
import promptJson from "@/lib/prompt/prompt-json";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(request: Request) {
  // request.json() un-jsons the body into a JS object
  const body: MessageFormatterFormShape = await request.json();
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: `${body.messageToFormat}`,
    instructions: JSON.stringify(promptJson),
  });

  // console.log(JSON.stringify(promptJson));

  // Send back the parsed message as a json object
  return Response.json(response.output_text);
}
