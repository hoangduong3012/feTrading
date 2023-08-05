import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import history from '@history';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import withReducer from 'app/store/withReducer';
import reducer from './store/planSlice';
import PlanTable from './PlanTable';
import symbolreducer from '../symbol/store/symbolSlice';

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

function PlanPage(props) {
  const { navigate } = props;
  const { t } = useTranslation('plan');
  const handleClickAdd = () => {
    history.push({
      pathname: '/planNew',
    });
  }
  return (
    <Root
      header={
        <>
          <div className="p-24">
            <h4>{t('TITLE')}</h4>
          </div>
          <Button color="secondary" size="large" onClick={handleClickAdd}
          >
            Add new
          </Button>
        </>
      }
      content={
        <div className="p-24">
          <h4>Trading plan Detail</h4>
          <PlanTable />
          <br />
        </div>
      }
    />
  );
}

export default withReducer('plan', reducer)(withReducer('symbol', symbolreducer)(PlanPage));
