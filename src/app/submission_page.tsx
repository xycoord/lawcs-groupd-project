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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useEffect } from 'react';
import { useData } from './DataContext';
import LinearProgress from '@mui/material/LinearProgress';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import InputLabel from '@mui/material/InputLabel';

export default function SumbissionPage(props:{onSubmit: () => void}) {
  const { setData } = useData();
  const [open, setOpen] = React.useState(false);
  const [fileUploaded, setFileUploaded] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [processedPDF, setProcessedPDF] = React.useState({})
  const [fileError, setFileError] = React.useState(false)
  const sendToServer = async () => {
    if(uploadedFile){
    
      const formData = new FormData();
    
      formData.append('file', uploadedFile);
      console.log(formData)
      
      await axios.post('http://localhost:5000/upload-pdf', formData)
    
        .then(response => {
          setProcessedPDF(response.data)
          setData(response.data)
          localStorage.setItem('myData', JSON.stringify(response.data));
          setOpen(true);
          setTimeout(props.onSubmit, 1000);
    
        })
    
        .catch(error => {
    
          console.error(error);
          setOpen(false);
          setError(true)
    
        });
      }else{
        console.log("No file selected!")
        setOpen(false)
        setFileError(true)
        return null
      }
  }
  const handleFileUpload = async (event: any) => {

    const file = event.target.files[0];
    if(file){
      setUploadedFile(file)
      setFileUploaded(true) 
      setFileError(false)
    
      // const formData = new FormData();
    
      // formData.append('file', file);
      // console.log(formData)
      
      // await axios.post('http://localhost:5000/upload-pdf', formData)
    
      //   .then(response => {
      //     setProcessedPDF(response.data)
      //     setData(response.data)
      //     localStorage.setItem('myData', JSON.stringify(response.data));
      //     setOpen(true);
      //     setTimeout(props.onSubmit, 1000);
    
      //   })
    
      //   .catch(error => {
    
      //     console.error(error);
    
      //   });
      }else{
        console.log("No file selected!")
        return null
      }
  
  };
  

  const [checked, setChecked] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if(event.target.checked) setError(false)
  };
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  

  useEffect(() => {
    if(processedPDF && Object.keys(processedPDF).length !== 0){
      
      console.log(processedPDF)
    }
  }, [processedPDF])

  const onSubmit = () => {
    if (!checked) {
      setError(true)
      return
    } 
    setOpen(true);
    sendToServer()
    //setTimeout(props.onSubmit, 2000);
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

              <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}

          >
            Choose file
            <VisuallyHiddenInput 
            type="file"
            onChange={(e) => {
              e.target.files != null ? handleFileUpload(e): null
            }}
            
             />
          </Button>
          {fileUploaded && <InputLabel htmlFor="file-upload" sx={{pt: 1}} >
            <FilePresentIcon /> {uploadedFile != null ? uploadedFile.name : "No file selected"}
            </InputLabel>
          }
              {/*<TextField
          id="filled-multiline-static"
          label="Your Data Protection Policy"
          multiline
          rows={6}
          defaultValue=""
          variant="filled"
  />*/} 
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
            label="I hereby consent to the use of any information inserted into this form to be used by the PrivacyPilot system." />
          </FormGroup>
          {error && <FormHelperText>Consent is required</FormHelperText>}
          {fileError && <FormHelperText>No file uploaded!</FormHelperText>}
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