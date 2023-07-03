import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchExampleDetail } from './store/exampleSlice';
import Edit from './Edit';
import Detail from './Detail';

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {
    padding: '10px',
    display: 'block',
  },
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

export default function ExampleDetail(props) {
  const [isEdit, setIsEdit] = useState(false);
  const { t } = useTranslation('example');
  const params = useParams();
  const example = useSelector(({ example }) => example.examples);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExampleDetail(params.id));
  }, [dispatch, params.id]);

  return (
    <Root
      header={
        <div className="p-24">
          <h4>{t('TITLE')}</h4>
          <Button color="secondary" size="large" onClick={(e) => {
          e.preventDefault();
            setIsEdit(!isEdit);
          }}
        >
          {isEdit ? 'Edit' : 'Detail'}
        </Button>
        </div>
        
      }
      // contentToolbar={

      // }
      content={
        <>
            {isEdit ? <Edit example={example} /> : <Detail example={example} />}
        </>
      }
    />
  );
}
