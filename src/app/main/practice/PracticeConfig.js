import i18next from 'i18next';
import Practice from './Practice';
import PracticeDetail from './PracticeDetail';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'practice', en);
i18next.addResourceBundle('tr', 'practice', tr);
i18next.addResourceBundle('ar', 'practice', ar);

const PracticeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: ["admin", 'Authenticated'],
  routes: [
    {
      path: 'practice',
      element: <Practice />,
    },
    {
      path: 'practiceDetail/:id',
      element: <PracticeDetail />,
    },
  ],
};

export default PracticeConfig;