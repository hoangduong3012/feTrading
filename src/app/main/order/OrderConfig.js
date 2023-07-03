import i18next from 'i18next';
import Order from './Order';
import OrderDetail from './OrderDetail';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'order', en);
i18next.addResourceBundle('tr', 'order', tr);
i18next.addResourceBundle('ar', 'order', ar);

const OrderConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: ["admin", 'Authenticated'],
  routes: [
    {
      path: 'order',
      element: <Order />,
    },
    {
      path: 'orderDetail/:id',
      element: <OrderDetail />,
    },
  ],
};

export default OrderConfig;