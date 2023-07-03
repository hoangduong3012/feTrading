import i18next from 'i18next';
import Example from './Example';
import ExampleDetail from './ExampleDetail';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'example', en);
i18next.addResourceBundle('tr', 'example', tr);
i18next.addResourceBundle('ar', 'example', ar);

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: ["admin", 'Authenticated'],
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
    {
      path: 'exampleDetail/:id',
      element: <ExampleDetail />,
    },
  ],
};

export default ExampleConfig;