import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import history from '@history';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import withReducer from 'app/store/withReducer';
import reducer from './store/practiceSlice';
import PracticeTable from './PracticeTable';

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

function PracticePage(props) {
  const { navigate } = props;
  const { t } = useTranslation('practice');
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
          <h4>Trading practice Detail</h4>
          <PracticeTable />
          <br />
          {/* <DemoContent /> */}
        </div>
      }
    />
  );
}

export default withReducer('practice', reducer)(PracticePage);
