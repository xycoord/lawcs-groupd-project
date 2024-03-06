"use client"

import { Box, Button, Card, CardActions, CardContent, Container, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import ClauseCard from "../components/clause_card";
import AnalysisCard from "../components/analysis_card";
import copy from "../copy/copy.json"
import example_clauses from "../copy/example_clauses.json"
import React from "react";
import ClassificationIcon from "../components/classification_icon";
import LoadingButton from '@mui/lab/LoadingButton';
import { PlayArrow } from "@mui/icons-material";
import { useData } from '../DataContext';
import { useEffect } from "react";

type clause = {
  number: string;
  representation: string[];
  text: string;
  top_words: string;
  topic_id: number; 
};
type call_body = {
  art: string;
  clauses: clause[];
}

export default function AnalysisPage() {

  const [level, setLevel] = React.useState([0,0,0,0]);
  const [global_level, setGlobalLevel] = React.useState(0);
  const [explanation, setExplanation] = React.useState(["","","",""]);
  const [processing, setProcessing] = React.useState(false);
  const [clauseData, setClauseData] = React.useState({});
  const [selectedArt, setSelectedArt] = React.useState(copy["7.1"].title);
  const [clause_cards, setClauseCards] = React.useState([<React.Fragment/>]);

  useEffect(() => {

    setClauseData(JSON.parse(localStorage.getItem('myData') || ''));

  }, []);

  useEffect(() => {
    console.log(clauseData)
  }, [clauseData])


  const body: call_body[] = [
    {
    art: "7.1",
    clauses: []
    },{
    art: "7.2",
    clauses: []
    },{
    art: "7.3",
    clauses: []
    },{
    art: "7.4",
    clauses: []
    }
  ]


  const onPromptSend = async () => {
    setProcessing(true)
    const new_levels = 
        level.map(x => x) 
    const new_explanations = 
        explanation.map(x => x) 

    //response api call...
    for (let i = 0; i < body.length; i++) {
      console.log("i:", i);

      new_levels[i] = 1

      setLevel([...new_levels]);
      
      const response = await callGetResponse(body[i]);

      console.log("i", response.level)

      new_levels[i] = response.level
      new_explanations[i] = response.explanation

      setLevel([...new_levels]);
      setExplanation([...new_explanations]);
      setGlobalLevel(Math.min( ...new_levels))
      console.log(new_levels)
    }

    setProcessing(false)
  }

  

  const callGetResponse = async (cb: call_body) => {
    //make api request
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cb),
    });

    //process response
    const data = await response.json();
    return data;
  };

  const Submit = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      onPromptSend();
  };

  const art_titles = ["Art. 7.1", "Art. 7.2", "Art. 7.3", "Art. 7.4"]

  const updateClauseCards = (art_title:string) => {
    const selected_clauses = 
      Object.keys(clauseData).length === 0 ? [] : 
      Object.values(clauseData).flat()
      .filter((clause: any)=> 
        art_titles[clause.topic_id - 1] == art_title
      )

    console.log("selected",art_title,selected_clauses)

    const cc = selected_clauses.map((clause: any) => {
        return <ClauseCard
                title={clause.number}
                content={clause.text}
              />
    });
    setClauseCards(cc)
  }

  let onSelectArt = (art_title: string) => {
    setSelectedArt(art_title)
    updateClauseCards(art_title)
  }

  return (
    <Container maxWidth={false}>
      <Grid container spacing={2} columns={51}>
        <Grid item xs={25}>
          <Typography variant="h4" gutterBottom>
            Selected Clauses ({selectedArt})
          </Typography>
          <Stack spacing={1}>
            {clause_cards} 
          </Stack>
        </Grid>
          <Divider orientation="vertical" flexItem sx={{ ml:"15px" ,mr: "-1px" }} />
        <Grid item xs={25}>
          <Stack direction="row" spacing={2} sx={{pb:1.5}} justifyContent={"space-between"}>
            <Stack direction="row" spacing={2}>
              <ClassificationIcon level={global_level}/>
              <Typography variant="h4" gutterBottom>
                Analysis
              </Typography>
            </Stack>
            <LoadingButton variant="contained"
              onClick={Submit}
              loading={processing}
              loadingPosition="end"
              endIcon={<PlayArrow />}
              color="secondary"
            >
              Run 
            </LoadingButton>
          </Stack>
          <Stack spacing={1} >
            <AnalysisCard
              art_info={copy["7.1"]}
              explaination={explanation[0]}
              level={level[0]}
              selected={selectedArt == copy["7.1"].title}
              onSelectArt={onSelectArt}
            />
            <AnalysisCard
              art_info={copy["7.2"]}
              explaination={explanation[1]}
              level={level[1]}
              selected={selectedArt == copy["7.2"].title}
              onSelectArt={onSelectArt}
            />
            <AnalysisCard
              art_info={copy["7.3"]}
              explaination={explanation[2]}
              level={level[2]}
              selected={selectedArt == copy["7.3"].title}
              onSelectArt={onSelectArt}
            />
            <AnalysisCard
              art_info={copy["7.4"]}
              explaination={explanation[3]}
              level={level[3]}
              selected={selectedArt == copy["7.4"].title}
              onSelectArt={onSelectArt}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}