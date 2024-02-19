import { Box, Card, CardActions, CardContent, Container, Divider, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ClauseCard from "../components/clause_card";
import AnalysisCard from "../components/analysis_card";
import copy from "../copy/copy.json"
import example_clauses from "../copy/example_clauses.json"

export default function AnalysisPage() {

  let clause_cards = example_clauses.map(function(clause) {
      return <ClauseCard
              title={clause.title}
              content={clause.content}
            /> 
  });


  return (
    <Container maxWidth={false}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Box sx={{ flexGrow: 0, flexShrink: 1, flexBasis: "auto" }} maxWidth={"50%"}>
          <Typography variant="h4" gutterBottom>
            Selected Clauses
          </Typography>
          <Stack spacing={1}>
            {clause_cards} 
          </Stack>
        </Box>
        <Box sx={{ flexGrow: 0, flexShrink: 1, flexBasis: "auto" }} maxWidth={"50%"}>
          <Typography variant="h4" gutterBottom>
            Analysis
          </Typography>
          <Stack spacing={1} >
            <AnalysisCard
              art_info={copy["7.1"]}
              explaination="The clause mentions that the data is being processed as a part of their functions as a government department, which makes the controller a public autority."
              level={-1}
            />
            <AnalysisCard
              art_info={copy["7.2"]}
              explaination="The clause mentions that the data is being processed as a part of their functions as a government department, which makes the controller a public autority."
              level={1}
            />
            <AnalysisCard
              art_info={copy["7.3"]}
              explaination="The clause mentions that the data is being processed as a part of their functions as a government department, which makes the controller a public autority."
              level={-1}
            />
            <AnalysisCard
              art_info={copy["7.4"]}
              explaination="The clause mentions that the data is being processed as a part of their functions as a government department, which makes the controller a public autority."
              level={0}
            />
          </Stack>
        </Box>
      </Stack> 
    </Container>
  );
}