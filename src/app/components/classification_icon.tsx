import { Check, Flag, PriorityHigh } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { amber, green, red } from "@mui/material/colors";

export default function ClassificationIcon(props:{level: number}) {
    if (props.level<0) return (
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          <PriorityHigh/> 
        </Avatar>
    );
    if (props.level>0) return (
        <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
          <Check/> 
        </Avatar>
    );
    return (
        <Avatar sx={{ bgcolor: amber[500] }} aria-label="recipe">
          <Flag/> 
        </Avatar>
    );
}
