"use client";

import { useState } from "react";

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Container } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';

import CustomAppBar from "./components/app_bar";
import SumbissionPage from "./submission_page";
import AnalysisPage from "./analysis/analysis_page";
import { useRouter } from 'next/navigation'
import { DataProvider } from './DataContext';

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

  const router = useRouter()

  return (
    <DataProvider>
      <main>
        
        <CustomAppBar/> 
        <Box sx={{ m: 2 }}>
          <SumbissionPage onSubmit={()=> 
          router.push('analysis')
          }/>
        </Box>
      </main>
    </DataProvider>
  );
}