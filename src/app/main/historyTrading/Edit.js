import { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/system';
import { TextField, Box, Select, MenuItem, Icon, InputAdornment, Button } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Editor } from '@tinymce/tinymce-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { HOST_URL, TYPE_TRADING } from 'app/constant/index';
import { Controller, useForm } from 'react-hook-form';
import UploadService from 'app/service/upload';
import { fetchHistoryTradingList } from './store/historyTradingSlice';

// 👇 Custom Styles for the Box Component
const CustomBox = styled(Box)({
  '&.MuiBox-root': {
    backgroundColor: '#fff',
    borderRadius: '2rem',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    padding: '1rem',
  },
  '&.MuiBox-root:hover, &.MuiBox-root.dragover': {
    opacity: 0.6,
  },
});

const Root = styled('div')({});

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter'),
});

const defaultValues = {
  title: 'title',
  description: 'description',
  personalIdeal: 'personalIdeal',
  type: 'type',
  fieldFile: null,
};

export default function Edit(props) {
  // const [singleFile, setSingleFile] = useState([]);
  const [fileList, setFileList] = useState([]);
  const { control, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues: props.goldLession.attributes,
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  function onSubmit(value) {
    console.log(value);
  }
  const editorRef = useRef(null);
  const handleChangeSelect = (value) => {
    setValue('type', value.target.value, { shouldTouch: true });
  };
  useEffect(() => {
    dispatch(fetchHistoryTradingList());
    // reset(props.goldLession.attributes);
  }, []);

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
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              label="Mô tả"
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
          render={({ field: { onChange } }) => (
            <Editor
              apiKey="n1426sgvqi9kegeyh05euhj7wbk5jc01essy3d1kbtxgv6pj"
              // eslint-disable-next-line no-return-assign
              onInit={(_evt, editor) => (editorRef.current = editor)}
              onEditorChange={onChange}
              initialValue="<p>This is the initial content of the editor.</p>"
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
