import { Grid, Card, Typography, CardContent, Chip, Stack } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import { styled } from '@mui/material/styles';

const CardItem = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  margin: `${theme.spacing(2)} 0`,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function Detail() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6} rowSpacing={4}>
          <Typography gutterBottom variant="subtitle1" component="div">
            <strong>Title</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography gutterBottom variant="subtitle1" component="div">
            <strong>Type</strong>
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row', md: 'row' }} spacing={1}>
            <Chip icon={<FaceIcon />} label="With Icon" variant="outlined" />
            <Chip icon={<FaceIcon />} label="With Icon" variant="outlined" />
            <Chip icon={<FaceIcon />} label="With Icon" variant="outlined" />
            <Chip icon={<FaceIcon />} label="With Icon" variant="outlined" />
            <Chip icon={<FaceIcon />} label="With Icon" variant="outlined" />
          </Stack>
        </Grid>
      </Grid>
      <CardItem>
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
                    '<h1>H1</h1><h2>H2</h2><h3>H3</h3><h4>H4</h4><h5>H5</h5><h6>H6</h6><p>default body1</p>',
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </CardItem>
      <Card>
        <CardContent>
          <Grid item xs={6}>
            <Typography gutterBottom variant="subtitle1" component="div">
              <strong>Personal Ideal</strong>
            </Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{
                __html:
                  '<h1>H1</h1><h2>H2</h2><h3>H3</h3><h4>H4</h4><h5>H5</h5><h6>H6</h6><p>default body1</p>',
              }}
            />
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
