import { useState } from 'react';
import { styled } from '@mui/system';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
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

export default function UnstyledTable() {
  const [isEdit, setIsEdit] = useState(false);
  const { t } = useTranslation('historyTrading');
  return (
    <Root
      header={
        <div className="p-24">
          <h4>{t('TITLE')}</h4>
        </div>
      }
      contentToolbar={
        <div className="px-24">
          <Button onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Edit' : 'Detail'}</Button>
        </div>
      }
      content={isEdit ? <Edit /> : <Detail />}
    />
  );
}
