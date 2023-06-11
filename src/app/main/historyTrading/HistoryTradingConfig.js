import i18next from 'i18next';
import HistoryTrading from './HistoryTrading';
import HistoryTradingDetail from './HistoryTradingDetail';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'historyTrading', en);
i18next.addResourceBundle('tr', 'historyTrading', tr);
i18next.addResourceBundle('ar', 'historyTrading', ar);

const HistoryTradingConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: ["admin"],
  routes: [
    {
      path: 'historyTrading',
      element: <HistoryTrading />,
    },
    {
      path: 'historyTradingDetail/:id',
      element: <HistoryTradingDetail />,
    },
  ],
};

export default HistoryTradingConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';
const Example = React.lazy(() => import('./Example'));

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : 'example',
            element: <Example/>
        }
    ]
};

export default ExampleConfig;

*/
