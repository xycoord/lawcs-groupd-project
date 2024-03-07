"use client"

import { Box, Button, Card, CardActions, CardContent, Container, Divider, Grid, IconButton, Stack, Typography, selectClasses } from "@mui/material";
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
  tags: string[]; 
};
type call_body = {
  art: string;
  clauses: string[];
}

export default function AnalysisPage() {

  const [level, setLevel] = React.useState([0,0,0,0]);
  const [global_level, setGlobalLevel] = React.useState(0);
  const [explanation, setExplanation] = React.useState(["","","",""]);
  const [processing, setProcessing] = React.useState(false);
  const [clauseData, setClauseData] = React.useState({});
  const [selectedArt, setSelectedArt] = React.useState(copy["7.1"].title);
  const [clause_cards, setClauseCards] = React.useState([<React.Fragment/>]);
  const [selectedClauses, setSelectedClauses] = React.useState([]);
  const [allClauses, setAllClauses] = React.useState([]);

  useEffect(() => {

    setClauseData(JSON.parse(localStorage.getItem('myData') || ''));

  }, []);

  //When clauseData loads, apply initial tags
  useEffect(() => {
    console.log(clauseData)
    if(Object.keys(clauseData).length !== 0){

      Object.values(clauseData).flat().map(
        (clause: any) => {
        let tags: any[] = []
        clause.representation.map((word: string) => {
          
          for (let i = 0; i < art_keywords.length; i++) {
            if(art_keywords[i].includes(word)){
              tags.push(art_titles[i])
            }
          }
        })
        //Take only unique tags
        tags = Array.from(new Set(tags));
        clause.tags = tags
      })
    }
    setAllClauses(Object.values(clauseData));
    //makeInitialClauses()
    //console.log(clauseData)
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

  useEffect(() => {
    console.log("Updating selected clauses")
     //Add clauses to body
     //console.log(selectedClauses)
     for (let i = 0; i < body.length; i++) {
      allClauses.map((c: clause) => console.log(c))

      Object.values(body)[i].clauses = allClauses.flat().map((c: clause) => c.tags.includes(art_titles[i]) ? c.text : "").filter((c: string) => c !== "");
    }
  }, [allClauses])

  const onPromptSend = async () => {
    setProcessing(true)
    console.log(body)
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
  const art_keywords = [["consent", "basis", "privacy", "policy", "reason"],
                        ["purpose", "processing", "duration", "usage", "cookie"],
                        ["withdraw", "remove", "opt", "out", "technology"],
                        ["introduction", "withdraw", "platform", "tiktok", "about"]]


  const updateClauseCards = (art_title:string) => {
    console.log("test")
    // const selected_clauses : any = 
    //   Object.keys(clauseData).length === 0 ? [] : 
    //   Object.values(clauseData).flat()
    //   .filter((clause: any)=> 
    //     clause.representation.some((word: string) => (art_keywords[art_titles.indexOf(art_title)].includes(word)))
    //   )
    // setSelectedClauses(selected_clauses)
    // console.log("selected",art_title,selected_clauses)


    
    let onSelectClause = (clause_number: number) => {
      let clauses_object : clause[] = allClauses.flat()
      
      clauses_object[clause_number].tags.includes(art_title) ?
        clauses_object[clause_number].tags = clauses_object[clause_number].tags.filter((tag: string) => tag !== art_title) :
        clauses_object[clause_number].tags.push(art_title)

      setAllClauses([clauses_object])
      updateClauseCards(art_title)
    }
    const cc = allClauses.flat().map((clause: any) => {
        return <ClauseCard 
                key={clause.number}
                title={clause.number}
                content={clause.text}
                selected={clause.tags.includes(art_title)}
                onSelectClause={onSelectClause}
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
              key={copy["7.1"].title}
              art_info={copy["7.1"]}
              explaination={explanation[0]}
              level={level[0]}
              selected={selectedArt == copy["7.1"].title}
              onSelectArt={onSelectArt}
            />
            <AnalysisCard
             key={copy["7.2"].title}
              art_info={copy["7.2"]}
              explaination={explanation[1]}
              level={level[1]}
              selected={selectedArt == copy["7.2"].title}
              onSelectArt={onSelectArt}
            />
            <AnalysisCard
             key={copy["7.3"].title}
              art_info={copy["7.3"]}
              explaination={explanation[2]}
              level={level[2]}
              selected={selectedArt == copy["7.3"].title}
              onSelectArt={onSelectArt}
            />
            <AnalysisCard
             key={copy["7.4"].title}
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