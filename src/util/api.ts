import axios from '~/plugins/axios';

export function test (data: any): Promise<any> {
  return axios({
    url: '/test',
    method: 'get',
    params: data,
  }).catch(() => Promise.resolve({}));
}
