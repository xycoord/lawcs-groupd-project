import { Check, Flag, HourglassEmpty, Padding, PriorityHigh, SmartToy } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import { amber, green, grey, red } from "@mui/material/colors";

export default function ClassificationIcon(props:{level: number}) {
    if (props.level==-3) return (
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          <PriorityHigh/> 
        </Avatar>
    );
    if (props.level==-1) return (
        <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
          <Check/> 
        </Avatar>
    );
    if (props.level==-2) return (
        <Avatar sx={{ bgcolor: amber[500] }} aria-label="recipe">
          <Flag/> 
        </Avatar>
    );
    if (props.level==1) return (
        <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
          <CircularProgress sx={{p:1}}/>
        </Avatar>
    );
    return (
        <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
          <SmartToy/> 
        </Avatar>
    );

}
