import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import history from '@history';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import withReducer from 'app/store/withReducer';
import reducer from './store/orderSlice';
import symbolreducer from '../symbol/store/symbolSlice';
import OrderTable from './OrderTable';

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

function OrderPage(props) {
  const { navigate } = props;
  const { t } = useTranslation('order');
  const handleClickAdd = () => {
    history.push({
      pathname: '/orderNew',
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
          <h4>Trading order Detail</h4>
          <OrderTable />
          <br />
          {/* <DemoContent /> */}
        </div>
      }
    />
  );
}

export default withReducer('order', reducer)(withReducer('symbol', symbolreducer)(OrderPage));
