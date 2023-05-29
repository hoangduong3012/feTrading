import DemoContent from '@fuse/core/DemoContent';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import withReducer from 'app/store/withReducer';
import reducer from './store/historyTradingSlice';
import HistoryTable from './HistoryTable';

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

function HistoryTradingPage(props) {
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
          
          <h4>Search Toolbar</h4>
        </div>
      }
      content={
        <div className="p-24">
          <h4>Trading table</h4>
          <HistoryTable />
          <br />
          {/* <DemoContent /> */}
        </div>
      }
    />
  );
}

export default withReducer('historyTrading', reducer)(HistoryTradingPage);
