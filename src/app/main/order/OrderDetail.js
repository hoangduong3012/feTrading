import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrderDetail, orderAction } from './store/orderSlice';
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

export default function OrderDetail(props) {
  const [isEdit, setIsEdit] = useState(false);
  const { t } = useTranslation('order');
  const params = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    if (params.id) {
      dispatch(fetchOrderDetail(params.id));
      setIsEdit(false);
    } else {
      dispatch(orderAction.resetOrder());
      setIsEdit(true);
    }
  }, []);

  return (
    <Root
      header={
        <div className="p-24">
          <h4>{t('TITLE')}</h4>
          { params.id && <Button color="secondary" size="large" onClick={(e) => {
          e.preventDefault();
            setIsEdit(!isEdit);
          }}
        >
          {!!isEdit ? 'Edit' : 'Detail'}
        </Button>}
        </div>
        
      }
      // contentToolbar={

      // }
      content={
        <>
            {isEdit ? <Edit /> : <Detail />}
        </>
      }
    />
  );
}
