import { styled } from '@mui/system';
import { Grid, Card, Typography } from '@mui/material';

const CardItem = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function Detail() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <CardItem>
        <Typography variant="body1" component="span">
            <strong>Title</strong>
        </Typography>
        </CardItem>
      </Grid>
      <Grid item xs={6}>
      <CardItem>
        <Typography variant="body1" component="span">
            <strong>Description</strong>
        </Typography>
        </CardItem>
      </Grid>
      <Grid item xs={6}>
      <CardItem>
        <Typography variant="body1" component="span">
            <strong>Personal Ideal</strong>
        </Typography>
        </CardItem>
      </Grid>
      <Grid item xs={6}>
      <CardItem>
        <Typography variant="body1" component="span">
            <strong>Type</strong>
        </Typography>
        </CardItem>
      </Grid>
    </Grid>
  );
}
