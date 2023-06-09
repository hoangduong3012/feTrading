import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import history from '@history';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import withReducer from 'app/store/withReducer';
import reducer from './store/exampleSlice';
import ExampleTable from './ExampleTable';

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

function ExamplePage(props) {
  const { navigate } = props;
  const { t } = useTranslation('example');
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
          <h4>Trading example Detail</h4>
          <ExampleTable />
          <br />
          {/* <DemoContent /> */}
        </div>
      }
    />
  );
}

export default withReducer('example', reducer)(ExamplePage);
