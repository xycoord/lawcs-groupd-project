import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PriorityHigh } from '@mui/icons-material';
import { Box, Chip, Divider } from '@mui/material';
import ClassificationIcon from './classification_icon';
import ClassificationInfo from './classification_info';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AnalysisCard(
  props:{ art_info: {
            title: string, 
            subtitle: string, 
            green: string, 
            yellow: string, 
            red: string 
          }
          explaination: string,
          level: number
        }
) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant='outlined'>
      <CardHeader
        avatar={<ClassificationIcon level={props.level}/>}
        title={props.art_info.title}
        subheader={props.art_info.subtitle}
        sx={props.explaination != "" ? { pb:0 } : null}
      />
      {props.explaination != "" ? <React.Fragment>
        <ClassificationInfo 
          level={props.level}
          green={props.art_info.green}
          yellow={props.art_info.yellow}
          red={props.art_info.red}
        />
        <CardActions disableSpacing sx={{pt: 0, pb:0.5 }}>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="explain"
          >
            <Typography variant="button">
              Explain 
            </Typography>
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions> 
      </React.Fragment>: null}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{py:0}}>
          <Divider />
          <Typography variant='body2' sx={{ pt: 1 }}>
            {props.explaination}
          </Typography>
          <Box sx={{ pt: 1 }} >
            <Chip icon={<PriorityHigh />} label="This explaination is AI generated. Use responisbly" color="error" variant='outlined' size='small' sx={{p:0.5}}/>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}