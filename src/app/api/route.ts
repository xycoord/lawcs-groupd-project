import { NextResponse } from "next/server";
import OpenAI from "openai";
import init_params from './prompt_params.json';

import art71 from "./trees/Art_7_1.json"
import art72 from "./trees/Art_7_2.json"

type prompt = {
  model: string;
  messages: OpenAI.ChatCompletionMessageParam[];
  temperature: number;
  max_tokens: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const gptToJSON = (textResponse: string) => {
  if (!textResponse.startsWith("```json\n")) return {};
  if (!textResponse.endsWith("```")) return {};
  return JSON.parse(textResponse.slice(8,-3));
}

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  const format = "\n Respond to each of these questions in json format.  The first property of the object should be labeled \"explanation\" and it's contents should be the reasons for your answer. The second property of the object should be labeled \"level\" and should be a Number which is -1 if your answer is yes, -3 if it is no, and -2 if your answer is unsure."

  const article = body.art == "7.1" ? art71 : art72 
  const clauses = body.clauses.map((clause:{title: string, content: string}) => clause.content)

  let explanation = ""

  let index = 0;
  //traverse tree
  while (index >= 0){
    const node = article[index];
    const params = init_params as prompt; 
    params.messages.push(
      { role: "system",
        content: node.prompt + format });
    params.messages.push(
      { role: "user",
        content: clauses.join("\n") }
    )
    // console.log("messages", params.messages)
    const completion = await openai.chat.completions.create(params);
    const response = completion.choices[0].message.content || "{}";
    const jsonResponse = gptToJSON(response);
    console.log( jsonResponse);
    explanation = jsonResponse.explanation || ""
    index = (jsonResponse.level == -1) ? node.yes : ((jsonResponse.level == -2) ? node.Unsure : node.no) ;
  }
  console.log("done!")
   
  return NextResponse.json({explanation:explanation, level:index}, { status: 200 });
}