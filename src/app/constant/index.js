export const IDEAL = 'ideal';
export const PENDING = 'pending';

export const HOST_URL = process.env.REACT_APP_SERVER_API;
export const DEFAULT_API_URL = `${
  process.env.REACT_APP_SERVER_API || 'http://localhost3000'
}/graphql`;
export const DEFAULT_WS_API_URL = 'http://localhost:3000/graphql';
export const TYPE_TRADING = ['MA', 'ElliotWave', 'Wyckoff', 'SD', 'SMC'];

// historyTrading
export const HISTORYTRADING_URL = 'historyTrading/fetchList';
export const HISTORYTRADINGDETAIL_URL = 'historyTrading/fetchDetail';
export const UPD_HISTORYTRADINGDETAIL_URL = 'historyTrading/updateDetail';

//Order
export const ORDER_URL = 'order/fetchList';
export const ORDERDETAIL_URL = 'order/fetchDetail';
export const UPD_ORDERDETAIL_URL = 'order/updateDetail';

//Example
export const EXAMPLE_URL = 'example/fetchList';
export const EXAMPLEDETAIL_URL = 'example/fetchDetail';
export const UPD_EXAMPLEDETAIL_URL = 'example/updateDetail';

//Example
export const PRACTICE_URL = 'practice/fetchList';
export const PRACTICEDETAIL_URL = 'practice/fetchDetail';
export const UPD_PRACTICEDETAIL_URL = 'practice/updateDetail';