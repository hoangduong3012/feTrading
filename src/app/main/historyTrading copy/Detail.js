import {
  Grid,
  Card,
  Typography,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { styled } from "@mui/material/styles";
import _ from "@lodash";

const CardItem = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  margin: `${theme.spacing(2)} 0`,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Detail(props) {
  const { goldLession } = props;
  return !_.isEmpty(goldLession) ? (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6} rowSpacing={4}>
        <Typography gutterBottom variant="subtitle1" component="div">
          <strong> {goldLession.attributes.title}</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Typography gutterBottom variant="subtitle1" component="div">
          <strong>Type</strong>
        </Typography>
        <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
          <Chip icon={<FaceIcon />} label={goldLession.attributes.type} variant="outlined" />
        </Stack>
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
                    goldLession.attributes.description,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
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
                  goldLession.attributes.personal_ideal,
                }}
              />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ) : null;
}
