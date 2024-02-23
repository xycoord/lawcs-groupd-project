import { CardContent, Typography } from "@mui/material";

export default function ClassificationInfo(props:{level: number, green: string, yellow: string, red: string}) {
    if (props.level==-3) return (
      <CardContent sx={{pb:0}}>
        <Typography variant="body2" >
          {props.red}
        </Typography>
      </CardContent>
    );
    if (props.level==-2) return (
      <CardContent sx={{pb:0}}>
        <Typography variant="body2" >
          {props.yellow}
        </Typography>
      </CardContent>
    );
    if (props.level==-1) return (
      <CardContent sx={{pb:0}}>
        <Typography variant="body2" >
          {props.green}
        </Typography>
      </CardContent> 
    );
    if (props.level==1) return (
      <CardContent sx={{pb:0}}>
        <Typography variant="body2" >
          Processing...
        </Typography>
      </CardContent>
    );
    return (
      <CardContent sx={{pb:0}}>
      </CardContent>
    );

}
