import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'historyTrading-component',
    title: 'HistoryTrading',
    translate: 'HISTORYTRADING',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'historyTrading',
  },
  {
    id: 'order-component',
    title: 'Order',
    translate: 'ORDER',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'order',
  },
  {
    id: 'example-component',
    title: 'Example',
    translate: 'EXAMPLE',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'example',
  },
  {
    id: 'practice-component',
    title: 'Practice',
    translate: 'PRACTICE',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'practice',
  },
];

export default navigationConfig;
