import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextareaAutosize,
  Button
} from "@mui/material";
import { styled } from '@mui/system';
import _ from "@lodash";
import moment from 'moment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import { addComment } from './store/planSlice';

const schema = yup.object().shape({
  comment: yup.string().required('You must enter'),
});
const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.5;
  height: 80px !important;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);
export default function Detail() {
  const plan = useSelector(({ plan }) => plan.plan);
  const dispatch = useDispatch();
  function onSubmit(value) {
    dispatch(addComment({...value, plan: plan.id, commentDate: moment(), publishedAt: moment()}));
  }
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {comment: '', },
    resolver: yupResolver(schema),
  });
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
        {plan.attributes.planDate && moment(plan.attributes.planDate).format('YYYY/MM/DD')}
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item>
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
      <Timeline       sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}>
      {plan.attributes.comments.data && plan.attributes.comments.data.map(c => (
         <TimelineItem>
           <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {moment(c.attributes.commentDate).format('YYYY/MM/DD HH:mm:ss')}
        </TimelineOppositeContent>
         <TimelineSeparator>
         <TimelineDot>
            <LaptopMacIcon />
          </TimelineDot>
           <TimelineConnector />
         </TimelineSeparator>
         <TimelineContent>{c.attributes.comment}</TimelineContent>
       </TimelineItem>
      ))}
      </Timeline>
      </Grid>
      <form
        name="addCommentForm"
        className="flex flex-col justify-center w-3/5 pl-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <StyledTextarea
              {...field}
              placeholder="thêm comment"
            />
          )}
        />
        <Button
          variant="contained"
          color="secondary"
          className=" w-2/5 mt-16"
          aria-label="Edit"
          type="submit"
          size="large"
        >
          Add comment
        </Button>
        </form>
    </Grid>
  ) : null;
}
