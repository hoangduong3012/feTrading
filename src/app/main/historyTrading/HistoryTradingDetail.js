import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchHistoryTradingDetail } from './store/historyTradingSlice';
import Edit from './Edit';
import Detail from './Detail';

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {
    padding: '2em',
  },
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

export default function HistoryTradingDetail(props) {
  const [isEdit, setIsEdit] = useState(false);
  const { t } = useTranslation('historyTrading');
  const params = useParams();
  const goldLession = useSelector(({ historyTrading }) => historyTrading.goldLession);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHistoryTradingDetail(params.id));
  }, [dispatch, params.id]);

  return (
    <Root
      header={
        <div className="p-24">
          <h4>{t('TITLE')}</h4>
        </div>
      }
      // contentToolbar={

      // }
      content={
        <>
          <div className="px-24">
            <Button onClick={(e) => {
              e.preventDefault();
                setIsEdit(!isEdit);
              }}
            >
              {isEdit ? 'Edit' : 'Detail'}
            </Button>
          </div>
          {isEdit ? <Edit goldLession={goldLession} /> : <Detail goldLession={goldLession} />}
        </>
      }
    />
  );
}
