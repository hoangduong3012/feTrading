import { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/system';
import { TextField, Select, MenuItem, Icon, InputAdornment, Button } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Editor } from '@tinymce/tinymce-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { HOST_URL, TYPE_TRADING } from 'app/constant/index';
import { Controller, useForm } from 'react-hook-form';
import UploadService from 'app/service/upload';
import { updateOrderDetail } from './store/orderSlice';

// 👇 Custom Styles for the Box Component

const Root = styled('div')({});

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter'),
});

export default function Edit(props) {
  // const [singleFile, setSingleFile] = useState([]);
  const [fileList, setFileList] = useState([]);
  const { control, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues: props.order.attributes,
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const loadingUpdate = useSelector(({ order }) => order.loadingUpdate);
  function onSubmit(value) {
    dispatch(updateOrderDetail({...value , id:  props.order.id}));
  }
  const editorRef = useRef(null);
  const handleChangeSelect = (value) => {
    setValue('type', value.target.value, { shouldTouch: true });
  };

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
          name="personal_ideal"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              label="Ý tưởng"
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
          name="type"
          control={control}
          render={({ field }) => (
            <>
              {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
              <Select {...field} label="Type" className="mb-16" onChange={handleChangeSelect}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {TYPE_TRADING.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
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
