import {
  Grid,
  Card,
  Typography,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";
import moment from 'moment';

export default function Detail(props) {
  const order = useSelector(({ order }) => order.order);
  return !_.isEmpty(order) ? (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={3} rowSpacing={4}>
            <Typography gutterBottom variant="subtitle1" component="div">
              <strong>Ticket</strong>
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
              <strong>{order.attributes.ticket}</strong>
            </Typography>
          </Grid>
        <Grid item xs={6} sm={6} md={3} rowSpacing={4}>
          <Typography gutterBottom variant="subtitle1" component="div">
            <strong>Ngày đặt order</strong>
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            <strong>{order.attributes.time &&  moment(order.attributes.time).format('YYYY/MM/DD HH:mm:ss')}</strong>
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={3} rowSpacing={4}>
          <Typography gutterBottom variant="subtitle1" component="div">
            <strong>Trạng thái</strong>
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
          <strong>{order.attributes.status}</strong>
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Typography gutterBottom variant="subtitle1" component="div">
            <strong>Type</strong>
          </Typography>
          <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
            <Chip
              icon={<FaceIcon />}
              label={order.attributes.symbol?.data.attributes.symbolNm}
              variant="outlined"
            />
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
                      __html: order.attributes.description,
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={3}>
              <Typography gutterBottom variant="subtitle1" component="div">
                <strong>Giá đặt: </strong>
                <span>{order.attributes.order_price}</span>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography gutterBottom variant="subtitle1" component="div">
                <strong>Giá đặt chốt lời: </strong>
                <span>{order.attributes.take_profit}</span>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography gutterBottom variant="subtitle1" component="div">
                <strong>Giá đặt dừng lỗ: </strong>
                <span>{order.attributes.stop_loss}</span>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography gutterBottom variant="subtitle1" component="div">
                <strong>Volume: </strong>
                <span>{order.attributes.volume}</span>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography gutterBottom variant="subtitle1" component="div">
                <strong>Giá chốt : </strong>
                <span>{order.attributes.order_price}</span>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography gutterBottom variant="subtitle1" component="div">
                <strong> lời/ lỗ: </strong>
                <span>{order.attributes.profit}</span>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  ) : null;
}
