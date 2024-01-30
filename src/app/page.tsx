"use client";

import { useState } from "react";


export default function Home() {

  // Set-up persistent memory for data stored between function calls
  // https://react.dev/learn/state-a-components-memory
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Yo, this is ChatterBot! How can I help you today?",
    },
  ]);

  const appendNewMessage = () => {
    let temp = messages;
    temp.push({ role: "user", content: inputText });
    setMessages(temp);
  };

  const onPromptSend = async () => {
    //setup call
    setIsLoading(true);
    appendNewMessage();
    setInputText("");

    console.log("Calling OpenAI...");

    //response api call...
    const response = await callGetResponse();
    
    // console.log("Choice", response.result);

    // setMessages((prevMessages) => [...prevMessages, response.explanation]);
    setIsLoading(false);
  }

  const callGetResponse = async () => {
    //make api request
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    //process response
    const data = await response.json();
    return data;
  };

  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onPromptSend();
    }
  };

  return (
    <main>
      <div>
        {messages.map((e) => {
          return (
            <div key={e.content}>
              {e.content}
            </div>
          );
        })}

        {isLoading ? ( <div>*thinking*</div> ) : ("")}
      </div>
      <div>
        <textarea
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          onKeyDown={Submit}
        />
        <button onClick={onPromptSend}>
          send
        </button>
      </div>
    </main>
  );
}