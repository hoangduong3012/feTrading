import {
  Grid,
  Card,
  Typography,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import _ from "@lodash";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';


export default function Detail(props) {
  const { plan } = props;
  return !_.isEmpty(plan) ? (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6} rowSpacing={4}>
        <Typography gutterBottom variant="subtitle1" component="div">
          <strong> {plan.attributes.title}</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Typography gutterBottom variant="subtitle1" component="div">
          <strong>Plan Date</strong>
        </Typography>
        {moment(plan.attributes.planDate).format('YYYY/MM/DD')}
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  <strong>Description</strong>
                </Typography>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{
                    __html:
                    plan.attributes.description,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
      <Timeline position="left">
      {plan.attributes.comments.map(c => {
         <TimelineItem>
           <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {moment(c.attributes.commentDate).format('YYYY/MM/DD')}
        </TimelineOppositeContent>
         <TimelineSeparator>
         <TimelineDot>
            <LaptopMacIcon />
          </TimelineDot>
           <TimelineConnector />
         </TimelineSeparator>
         <TimelineContent>{c.attributes.comment}</TimelineContent>
       </TimelineItem>
      })}
      </Timeline>
      </Grid>
    </Grid>
  ) : null;
}
