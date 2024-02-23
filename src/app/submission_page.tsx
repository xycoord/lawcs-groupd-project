"use client";

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Container, Box, Backdrop, CircularProgress, FormHelperText, FormControl } from "@mui/material";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import React from 'react';


export default function SumbissionPage(props:{onSubmit: () => void}) {

  const [open, setOpen] = React.useState(false);


  const [checked, setChecked] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if(event.target.checked) setError(false)
  };


  const onSubmit = () => {
    if (!checked) {
      setError(true)
      return
    } 
    setOpen(true);
    setTimeout(props.onSubmit, 5000);
  }

  return (
    <Container maxWidth="md"  >
      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent sx={{'&:last-child': { pb: 2 }}}>
            <Typography variant="body1">
              This website helps you check if your data protection policy complies with the requirements of GDPR.
            </Typography>
          </CardContent>
        </Card>
        <FormGroup sx={{ paddingX: 1.5 }}>
          <FormLabel component="legend">Select articles to check</FormLabel>
          <FormControlLabel control={<Checkbox color='secondary'/>} label="Article 7" />
          <FormControlLabel disabled control={<Checkbox color='secondary'/>} label="Article 12" />
          <FormControlLabel disabled control={<Checkbox color='secondary'/>} label="Article 16" />
          <FormControlLabel disabled control={<Checkbox color='secondary'/>} label="Article 17" />
          <FormControlLabel disabled control={<Checkbox color='secondary'/>} label="Check All" />
        </FormGroup>
        <TextField
          id="filled-multiline-static"
          label="Your Data Protection Policy"
          multiline
          rows={6}
          defaultValue=""
          variant="filled"
        />
        <FormControl error={error}>
          <FormGroup>
            <FormControlLabel control={
              <Checkbox
                required
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                color='secondary'
              />} 
            label="I hereby consent to the use of any information inserted into this form to be used by the GDPRobot system." />
          </FormGroup>
        </FormControl>
        <Box>
          <Button variant="contained"
            onClick={onSubmit}
          >
            Submit 
          </Button>
        </Box>
      </Stack> 
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}