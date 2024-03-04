import { Box, Card, CardActions, CardContent, CardHeader, Container, Divider, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function ClauseCard(props:{ title: string, content: string }) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="body1" gutterBottom style={{"userSelect": "none"}}>
           {props.title} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {props.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{pt: 0, width: '100%', justifyContent: 'flex-end' }}>
        <IconButton aria-label="remove" size="small">
          {//<CloseIcon fontSize="small"/>
}
        </IconButton>
      </CardActions>
    </Card>
  );
}