import { NextResponse } from "next/server";
import OpenAI from "openai";
import tree from './test_tree.json'
import init_params from './prompt_params.json';
import next from "next";

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

const variableMap = new Map();
variableMap.set("$colour$", "blue");
variableMap.set("$letter$", "j");

const fillPattern = (pattern:string) => {
  while(/\$[\s\S]*\$/.test(pattern)){
    const key = /\$[\s\S]*\$/.exec(pattern)![0];
    pattern = pattern.replace(key, variableMap.get(key));
  }
  return pattern;
}

export async function POST(req: Request, res: NextResponse) {
  // const body = await req.json();

  console.log(tree);
  let index = 0;
  while (index >= 0){
    const node = tree[index];
    const params = init_params as prompt; 
    const question = fillPattern(node.prompt);
    params.messages.push(
      { role: "user",
        content: question });
    const completion = await openai.chat.completions.create(params);
    const response = completion.choices[0].message.content || "{}";
    const jsonResponse = gptToJSON(response);
    console.log(question, jsonResponse);
    index = jsonResponse.result ? node.yes : node.no;
  }
  console.log("done!")
   
  return NextResponse.json({}, { status: 200 });
}