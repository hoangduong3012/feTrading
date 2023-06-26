export const IDEAL = 'ideal';
export const PENDING = 'pending';
export const HISTORYTRADING_URL = 'historyTrading/fetchList';
export const HISTORYTRADINGDETAIL_URL = 'historyTrading/fetchDetail';
export const HOST_URL = process.env.REACT_APP_SERVER_API;
export const DEFAULT_API_URL = `${
  process.env.REACT_APP_SERVER_API || 'http://localhost3000'
}/graphql`;
export const DEFAULT_WS_API_URL = 'http://localhost:3000/graphql';
export const TYPE_TRADING = ['MA', 'Elliot Wave', 'Wyckoff', 'SD', 'SMC'];