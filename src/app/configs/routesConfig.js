import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import HistoryTrading from '../main/historyTrading/HistoryTradingConfig';
import OrderTrading from '../main/order/OrderConfig';
import PracticeConfig from '../main/practice/PracticeConfig';
import ExampleConfig from '../main/example/ExampleConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';

const routeConfigs = [ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig, HistoryTrading, OrderTrading, PracticeConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="historyTrading" />,
    auth: ['admin', 'Authenticated'],
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
