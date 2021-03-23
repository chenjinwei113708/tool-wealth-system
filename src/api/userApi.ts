import axios from '@/plugins/axios';

export default {
  login (data: { username: string, password: string }) {
    return axios({
      url: '/api/login',
      method: 'POST',
      data,
    });
  },
  logout () {
    return axios({
      url: '/api/logout',
      method: 'POST',
    });
  },

  getInfo () {
    return axios({
      url: '/api/user/info',
      method: 'POST',
    });
  },
}