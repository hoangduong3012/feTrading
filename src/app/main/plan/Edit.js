import { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/system';
import { TextField, Select, MenuItem, Icon, InputAdornment, Button } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Editor } from '@tinymce/tinymce-react';
import _ from "@lodash";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { showMessage } from 'app/store/fuse/messageSlice';
import { HOST_URL } from 'app/constant/index';
import { Controller, useForm } from 'react-hook-form';
import UploadService from 'app/service/upload';
import { updatePlanDetail, addPlan, planAction } from './store/planSlice';
import history from '@history';

// 👇 Custom Styles for the Box Component

const Root = styled('div')({});

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter'),
});

export default function Edit() {
  const planSelect = useSelector(({ plan }) => plan);
  const { loadingUpdate, plan } = planSelect;
  const { control, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues: plan?.attributes && {...plan?.attributes, planDate: plan?.attributes.planDate ? dayjs(plan?.attributes.planDate) : ''} || {description: 'abc'},
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  function onSubmit(value) {
    if (!_.isEmpty(plan)) {
      //const newValue = _.cloneDeep(value);
      const {comments, symbol, ...newValue} = value;
      dispatch(updatePlanDetail({...newValue , id:  plan.id}));
    } else {
      dispatch(addPlan({...value, publishedAt: moment()}));
      history.push({
        pathname: '/plan',
      });
    }
  }
  const editorRef = useRef(null);
  useEffect(() => {
    if (loadingUpdate == 'error') {
      dispatch(showMessage({ message: 'loi khi update' }));
    } else if(loadingUpdate == 'success') {
      dispatch(showMessage({ message: 'update thanh cong' }));
    }
  }, [loadingUpdate]);

  return (
    <Root>
      <form
        name="historyTradingEditForm"
        className="flex flex-col justify-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              // error={!!errors.email}
              // helperText={errors?.email?.message}
              label="Tiêu đề"
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
          name="planDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                {...field}
                className="mb-16"
                type="text"
                label="ngay len y tuong"
                variant="outlined"
                defaultValue={moment()}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="description"
          control={control}
          // eslint-disable-next-line no-shadow
          render={({ field: { onChange, value } }) =>
            (
            <Editor
              apiKey="n1426sgvqi9kegeyh05euhj7wbk5jc01essy3d1kbtxgv6pj"
              // eslint-disable-next-line no-return-assign
              onInit={(_evt, editor) => (editorRef.current = editor)}
              onEditorChange={onChange}
              value={value}
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
