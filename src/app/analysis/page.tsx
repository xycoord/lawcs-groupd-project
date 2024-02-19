"use client";

import { useState } from "react";

import { Box } from "@mui/material";

import CustomAppBar from "../components/app_bar";
import AnalysisPage from "./analysis_page";


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
      <CustomAppBar/> 
      <Box sx={{ m: 2 }}>
        <AnalysisPage/>
      </Box>
    </main>
  );
}