import { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/system';
import { TextField, Select, MenuItem, Icon, InputAdornment, Button, Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Editor } from '@tinymce/tinymce-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import moment from 'moment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { HOST_URL, TYPE_ORDER } from 'app/constant/index';
import { Controller, useForm } from 'react-hook-form';
import UploadService from 'app/service/upload';
import history from '@history';
import { updateOrderDetail, addOrder } from './store/orderSlice';
import { fetchSymbolList } from '../symbol/store/symbolSlice';
// 👇 Custom Styles for the Box Component

const Root = styled('div')({});

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  ticket: yup.string().required('You must enter'),
});

export default function Edit(props) {
  const orderSelect = useSelector(({ order }) => order);
  const symbolSelect = useSelector(({ symbol }) => symbol);
  const { loadingUpdate, order } = orderSelect;
  const { symbolList, pagination, optionPaging } = symbolSelect;
  const total = pagination?.total ? pagination.total : 0;
  const page = pagination?.page ? pagination.page - 1 : 0;
  const pageSize = pagination?.pageSize ? pagination.pageSize : 10;
  const { control, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues: (order?.attributes && {
      ...order?.attributes,
      time: order?.attributes.time ? dayjs(order?.attributes.time) : '',
    }) || { description: 'abc' },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  function onSubmit(value) {
    const newValue = {
      ticket: Number(value.ticket),
      order_price: Number(value.order_price),
      stop_loss: Number(value.stop_loss),
      take_profit: Number(value.take_profit),
      volume: Number(value.volume),
      cut_price: Number(value.cut_price),
      profit: Number(value.profit),
      profit: Number(value.profit),
      symbol: value.symbol,
    };
    if (!_.isEmpty(order)) {
      dispatch(updateOrderDetail({ ...newValue, id: value.id }));
    } else {
      dispatch(addOrder({ ...newValue, publishedAt: moment() }));
      history.push({
        pathname: '/order',
      });
    }
  }
  const editorRef = useRef(null);
  const handleChangeSelect = (value) => {
    setValue('type', value.target.value, { shouldTouch: true });
  };
  const handleChangeSelectSymbol = (value) => {
    setValue('symbol', value.target.value, { shouldTouch: true });
  };
  useEffect(() => {
    if (loadingUpdate === 'error') {
      dispatch(showMessage({ message: 'loi khi update' }));
    } else if (loadingUpdate === 'success') {
      dispatch(showMessage({ message: 'update thanh cong' }));
    }
  }, [dispatch, loadingUpdate]);

  useEffect(() => {
    dispatch(fetchSymbolList({
      ...optionPaging,
      pagination: { page, pageSize },
    }));
  }, []);

  return (
    <Root>
      <form
        name="OrderEditForm"
        className="flex flex-col justify-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="ticket"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              // error={!!errors.email}
              // helperText={errors?.email?.message}
              label="Ticket"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      exp
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                {...field}
                className="mb-16"
                type="text"
                label="Ngày đặt order"
                variant="outlined"
                defaultValue={moment()}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="order_price"
          control={control}
          render={({ field }) => (
            <TextField
             {...field}
             className="mb-16"
              label="Giá đặt"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="stop_loss"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              label="Giá cắt"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="take_profit"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              label="Giá cắt"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="volume"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              label="khối lượng"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="cut_price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              label="Giá thực tế cắt"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="profit"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              label="Lời"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <>
              {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
              <Select {...field} label="Type" className="mb-16" onChange={handleChangeSelect}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {TYPE_ORDER.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        />
       <Controller
          name="symbol"
          control={control}
          render={({ field }) => (
            <>
              {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
              <Select {...field} label="Type" className="mb-16" onChange={handleChangeSelectSymbol}>
                {symbolList.map(symbol => (
                        <MenuItem key={symbol.id} value={symbol.id}>
                        <em>{symbol.attributes.symbolNm}</em>
                      </MenuItem>
                ))}
              </Select>
            </>
          )}
        />
        <Controller
          name="author"
          control={control}
          // eslint-disable-next-line no-shadow
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              label="Tác giả"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      exp
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          // eslint-disable-next-line no-shadow
          render={({ field: { onChange, value } }) => (
            <Editor
              apiKey="n1426sgvqi9kegeyh05euhj7wbk5jc01essy3d1kbtxgv6pj"
              // eslint-disable-next-line no-return-assign
              onInit={(_evt, editor) => (editorRef.current = editor)}
              onEditorChange={onChange}
              initialValue={value}
              init={{
                height: 500,
                images_upload_handler: (blobInfo, _progress) =>
                  new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append(`files`, blobInfo.blob(), blobInfo.filename());
                    UploadService.upload({
                      info: { name: blobInfo.filename() },
                      files: blobInfo.blob(),
                    })
                      .then((response) => {
                        resolve(`${HOST_URL}${response.data.upload.data.attributes.url}`);
                        console.log(response);
                      })
                      .catch((error) => {
                        reject(error);
                      });
                  }),
                menubar: 'insert',
                plugins: [
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'code',
                  'help',
                  'wordcount',
                ],
                toolbar:
                  'image | undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
            />
          )}
        />
        <Button
          variant="contained"
          color="secondary"
          className=" w-full mt-16"
          aria-label="Edit"
          type="submit"
          size="large"
        >
          Edit
        </Button>
      </form>
    </Root>
  );
}
