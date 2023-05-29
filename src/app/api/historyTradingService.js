import Request from "./request";

export default class HistoryTradingService {
  static async getList(data = {}, query= {}) {
    return new Promise((resolve) => {
      Request.send({
        method: "GET",
        path: "api/gold-lessions",
        data,
        query
      }).then((result = {}) => {
        const { data, meta } = result;
        if (data) {
          return resolve({ isSuccess: true, data, meta });
        } else {
          return resolve({ isSuccess: false, message });
        }
      });
    });
  }

}