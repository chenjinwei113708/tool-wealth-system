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

  getInfo (data?: { token?: string, username?: string }) {
    return axios({
      url: '/api/user/info',
      method: 'POST',
      data,
      headers: {
        'sso-username': data?.username,
        'sso-token': data?.token,
      }
    });
  },

  createUser (data: {
    username: string,
    is_admin: 0 | 1,
    role_id: number,
  }) {
    return axios({
      url: '/api/user/create',
      method: 'POST',
      data,
    });
  },

  updateUser (data: {
    id: number,
    is_admin: 0 | 1,
    role_id: number,
  }) {
    return axios({
      url: '/api/user/update',
      method: 'POST',
      data,
    });
  },

  deleteUser (data: {
    id: number,
  }) {
    return axios({
      url: '/api/user/delete',
      method: 'POST',
      data,
    });
  },

  getUserList () {
    return axios({
      url: '/api/user/list',
      method: 'POST',
    });
  },
}