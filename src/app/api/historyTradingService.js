import Request from './request';

export default class HistoryTradingService {
  static async getList(dataRequest = {}, query = {}) {
    return new Promise((resolve) => {
      Request.send({
        method: 'GET',
        path: 'api/gold-lessions',
        dataRequest,
        query,
      }).then((result = {}) => {
        const { data, meta } = result;
        if (data) {
          return resolve({ isSuccess: true, data, meta });
        }
        return resolve({ isSuccess: false });
      });
    });
  }
}
