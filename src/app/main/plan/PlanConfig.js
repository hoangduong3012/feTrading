import i18next from 'i18next';
import Plan from './Plan';
import PlanDetail from './PlanDetail';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'plan', en);
i18next.addResourceBundle('tr', 'plan', tr);
i18next.addResourceBundle('ar', 'plan', ar);

const PlanConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: ["admin", 'Authenticated'],
  routes: [
    {
      path: 'plan',
      element: <Plan />,
    },
    {
      path: 'planDetail/:id',
      element: <PlanDetail />,
    },
    {
      path: 'planNew',
      element: <PlanDetail />,
    },
  ],
};

export default PlanConfig;