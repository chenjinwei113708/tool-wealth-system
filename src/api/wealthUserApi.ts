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

  getUserGoldDetail (data: {
    pageNumber?: number,
    pageSize?: number,
    puid?: string,
    appname?: string,
    userId: string,
    startDate: string,
    endDate: string,
  }) {
    return axios({
      url: '/api/wealth/user/gold/detail',
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

  getUserCashRecord (data: {
    pageNumber?: number,
    pageSize?: number,
    userId?: string,
    appname?: string,
    status?: number,
  }) {
    return axios({
      url: '/api/wealth/user/cash',
      method: 'POST',
      data,
    });
  },

  resolveUserCashRecord (data: {
    id: number | string,
  }) {
    return axios({
      url: '/api/wealth/user/cash/withdraw/resolve',
      method: 'POST',
      data,
    });
  },

  rejectUserCashRecord (data: {
    id: number | string,
  }) {
    return axios({
      url: '/api/wealth/user/cash/withdraw/reject',
      method: 'POST',
      data,
    });
  },
}