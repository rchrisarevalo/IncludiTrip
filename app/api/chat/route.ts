import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

// Set up Groq API
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const POST = async (req: NextRequest) => {
  const data: Groq.Chat.Completions.ChatCompletionMessageParam[] =
    await req.json();

  try {
    if (process.env.GROQ_PROMPT) {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          ...data,
          { role: "system", content: process.env.GROQ_PROMPT },
        ],
        model: "llama3-70b-8192",
        response_format: { type: "json_object" },
      });

      const res: string | null = JSON.parse(
        chatCompletion.choices[0].message.content as string
      );

      return NextResponse.json({
        content: res,
        role: "assistant",
      });
    } else {
      return NextResponse.json({
        content: "Error in processing request",
        role: "assistant",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      content: "Error in processing request",
      role: "assistant",
    });
  }
};

export { POST };
