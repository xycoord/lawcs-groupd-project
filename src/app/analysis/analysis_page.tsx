import { Box, Button, Card, CardActions, CardContent, Container, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import ClauseCard from "../components/clause_card";
import AnalysisCard from "../components/analysis_card";
import copy from "../copy/copy.json"
import example_clauses from "../copy/example_clauses.json"
import React from "react";
import ClassificationIcon from "../components/classification_icon";
import LoadingButton from '@mui/lab/LoadingButton';
import { PlayArrow } from "@mui/icons-material";

type clause = {
  title: string;
  content: string;
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

  const body: call_body[] = [
    {
    art: "7.1",
    clauses: example_clauses
    },{
    art: "7.2",
    clauses: example_clauses
    },{
    art: "7.3",
    clauses: example_clauses
    },{
    art: "7.4",
    clauses: example_clauses
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

  let clause_cards = example_clauses.map(function(clause) {
      return <ClauseCard
              title={clause.title}
              content={clause.content}
            /> 
  });

  const explaination = "This will be where the explaination generated by GPT4 will appear."


  return (
    <Container maxWidth={false}>
      <Grid container spacing={2} columns={51}>
        <Grid item xs={25}>
          <Typography variant="h4" gutterBottom>
            Selected Clauses
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
            />
            <AnalysisCard
              art_info={copy["7.2"]}
              explaination={explanation[1]}
              level={level[1]}
            />
            <AnalysisCard
              art_info={copy["7.3"]}
              explaination={explanation[2]}
              level={level[2]}
            />
            <AnalysisCard
              art_info={copy["7.4"]}
              explaination={explanation[3]}
              level={level[3]}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}