import { useState, useCallback, useEffect, useRef } from 'react';
import { styled } from '@mui/system';
import {
  TextField,
  Stack,
  Box,
  Typography,
  Select,
  MenuItem,
  Icon,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ImageConfig } from '@fuse/default-settings/FileConfig';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { HOST_URL } from 'app/constant/index';
import { Controller, useForm, useController } from 'react-hook-form';
import axios from 'axios';
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
  exp1: yup.string().required('You must enter'),
});

const defaultValues = {
  title: 'title',
  description: 'description',
  personalIdeal: 'personalIdeal',
  type: 'type',
  fieldFile: null,
};

export default function Edit() {
  // const [singleFile, setSingleFile] = useState([]);
  const [fileList, setFileList] = useState([]);
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const wrapperRef = useRef(null);
  const { field: newField } = useController({ control });
  const dispatch = useDispatch();

  const onSubmit = (value) => {
    console.log(value);
  };
  const editorRef = useRef(null);
  const handleChangeSelect = (value) => {
    console.log(value);
  };

  // 👇 Toggle the dragover class
  const onDragEnter = () => wrapperRef.current?.classList.add('dragover');
  const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');

  // 👇 Image Upload Service
  const onFileDrop = useCallback(
    (e) => {
      const { target } = e;
      if (!target.files) return;
      const newFiles = Object.values(target.files).map((file) => file);
      if (newFiles) {
        const updatedList = [...fileList, ...newFiles];
        setFileList(updatedList);
        newField.onChange(updatedList);
      }
    },
    [newField, fileList]
  );

  //  remove multiple images
  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  //  Calculate Size in KiloByte and MegaByte
  const calcSize = (size) => {
    return size < 1000000 ? `${Math.floor(size / 1000)} KB` : `${Math.floor(size / 1000000)} MB`;
  };
  useEffect(() => {
    dispatch(fetchHistoryTradingList());
    // setFullName({name:'TrungHC',familyName: 'HCT'});
  }, []);

  return (
    <Root>
      <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
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
          name="personalIdeal"
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
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
        <CustomBox>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              position: 'relative',
              width: '100%',
              height: '13rem',
              border: '2px dashed #4267b2',
              borderRadius: '20px',
            }}
            ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDragLeave}
          >
            <Stack justifyContent="center" sx={{ p: 1, textAlign: 'center' }}>
              <Typography sx={{ color: '#ccc' }}>Browse files to upload</Typography>
              <div>
                <img
                  src="assets/images/avatars/profile.jpg"
                  alt="file upload"
                  style={{ width: '5rem' }}
                />
              </div>
              <Typography variant="body1" component="span">
                <strong>Supported Files</strong>
              </Typography>
              <Typography variant="body2" component="span">
                JPG, JPEG, PNG
              </Typography>
            </Stack>
            <Controller
              defaultValue=""
              control={control}
              render={({ field: { name, onBlur, ref } }) => (
                <input
                  type="file"
                  name={name}
                  onBlur={onBlur}
                  ref={ref}
                  onChange={onFileDrop}
                  multiple
                  accept="image/jpg, image/png, image/jpeg"
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                />
              )}
            />
          </Box>
          {fileList.length > 0 ? (
            <Stack spacing={2} sx={{ my: 2 }}>
              {fileList.map((item, index) => {
                const imageType = item.type.split('/')[1];
                return (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      backgroundColor: '#f5f8ff',
                      borderRadius: 1.5,
                      p: 0.5,
                    }}
                  >
                    <Box display="flex">
                      <img
                        src={ImageConfig[`${imageType}`] || ImageConfig.default}
                        alt="upload"
                        style={{
                          height: '3.5rem',
                          objectFit: 'contain',
                        }}
                      />
                      <Box sx={{ ml: 1 }}>
                        <Typography>{item.name}</Typography>
                        <Typography variant="body2">{calcSize(item.size)}</Typography>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={() => {
                        fileRemove(item);
                      }}
                      sx={{
                        color: '#df2c0e',
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                );
              })}
            </Stack>
          ) : null}
        </CustomBox>
        <Editor
          apiKey="n1426sgvqi9kegeyh05euhj7wbk5jc01essy3d1kbtxgv6pj"
          // eslint-disable-next-line no-return-assign
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            images_upload_handler: (blobInfo, _progress) =>
              new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append(`files`, blobInfo.blob(), blobInfo.filename());
                //   await fetch(`${HOST_URL}api/upload`, {
                //     method: 'post',
                //     body: { files: [arrayBuffer]},
                //     headers: { Authentication: `Bearer ${JwtService.getAccessToken}` },
                //   });
                axios({
                  method: 'post',
                  url: `${HOST_URL}/api/upload`,
                  data: formData,
                })
                  .then((response) => {
                    resolve(`${HOST_URL}/${response.data[0].url}`);
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
      </form>
    </Root>
  );
}
