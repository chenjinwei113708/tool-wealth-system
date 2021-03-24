import axios from '@/plugins/axios';

export default {
  getUserGold (data: {
    pageNumber?: number,
    pageSize?: number,
    userId?: string,
    appname?: string,
  }) {
    return axios({
      url: '/api/wealth/user/gold',
      method: 'POST',
      data,
    });
  },

  updateUserGold (data: {
    leftCash?: number,
    frozenCash?: number,
    accumulateCash?: number,
    accumulateReview?: number,
    id: string,
  }) {
    return axios({
      url: '/api/wealth/user/gold/update',
      method: 'POST',
      data,
    });
  },
}