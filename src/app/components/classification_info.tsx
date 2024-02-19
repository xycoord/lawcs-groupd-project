import { Check, Flag, PriorityHigh } from "@mui/icons-material";
import { Avatar, CardContent, Typography } from "@mui/material";
import { amber, green, red } from "@mui/material/colors";

export default function ClassificationInfo(props:{level: number, green: string, yellow: string, red: string}) {
    if (props.level<0) return (
      <CardContent sx={{pb:0}}>
        <Typography variant="body2" >
          {props.red}
        </Typography>
      </CardContent>
    );
    if (props.level>0) return (
      <CardContent sx={{pb:0}}>
        <Typography variant="body2" >
          {props.green}
        </Typography>
      </CardContent> 
    );
    return (
      <CardContent sx={{pb:0}}>
        <Typography variant="body2" >
          {props.yellow}
        </Typography>
      </CardContent>
    );
}
