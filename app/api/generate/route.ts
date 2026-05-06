import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Return ONLY React component code."
        },
        {
          role: "user",
          content: `Create React app: ${prompt}`
        }
      ]
    })
  });

  const data = await response.json();
  let code = data.choices?.[0]?.message?.content || "";

  code = code.replace(/```[a-z]*\n?/g, "").replace(/```/g, "");

  return NextResponse.json({ code });
}