import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import history from '@history';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import withReducer from 'app/store/withReducer';
import reducer from './store/orderSlice';
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
      pathname: '/',
    });
  }
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
          <div>
            {' '}
            <Button
              className={clsx('', 'abc')}
              variant="contained"
              size="large"
              color="primary"
              endIcon={<AddBoxIcon />}
              onClick={handleClickAdd}
            >
              <span>Add new</span>
            </Button>
          </div>
        </div>
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

export default withReducer('order', reducer)(OrderPage);
