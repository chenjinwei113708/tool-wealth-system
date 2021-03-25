import axios from '~/plugins/axios';

export function test (data: any): Promise<any> {
  return axios({
    url: '/test',
    method: 'get',
    params: data,
  }).catch(() => Promise.resolve({}));
}

/**todo delete */
export function getNewsList (data: { catid: number, offset?: number, limit?: number, order_prior?: boolean } ): Promise<any> {
  return axios({
    url: '/getNewsList',
    method: 'get',
    params: data,
  }).catch(() => Promise.resolve([]));
}

export function getNewsDetail (data: { id: number } ): Promise<any> {
  return axios({
    url: '/getNewsDetail',
    method: 'get',
    params: data,
  }).catch(() => Promise.resolve(null));
}

export function getRelatedNews (data: { id: number } ): Promise<any> {
  return axios({
    url: '/getRelatedNews',
    method: 'get',
    params: data,
  }).catch(() => Promise.resolve([]));
}

export function getJobs (data?: { type?: '0' | '1' } ): Promise<any> {
  return axios({
    url: '/getJobs',
    method: 'get',
    params: data,
  }).catch(() => Promise.resolve({}));
}

export function getGame (game: string): Promise<any> {
  return axios({
    url: `/getGame/${game}`,
    method: 'get',
  }).catch(() => Promise.resolve(null));
}
