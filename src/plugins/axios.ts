import { message } from 'antd';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import history from '@/plugins/history';

export interface IResponse {
  code?: any;
  isSuccess: boolean;
  data: any;
  msg: any;
}

export interface IAxios extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<any>;
  (url: string, config?: AxiosRequestConfig): Promise<any>;
}

export type IAxiosError = ErrorProcessor;

class ErrorProcessor extends Error {
  private msg: string;
  private _code: number;
  private _status: number;
  constructor (status = 200, code?: number, defaultMsg?: string) {
    super();
    this._code = code || 0;
    this._status = status;
    this.msg = defaultMsg || '未知错误';
  }

  get message () {
    return this.msg;
  }

  get code () {
    return this._code;
  }

  get status () {
    return this._status;
  }

  toString () {
    return this.msg;
  }
}

const options: AxiosRequestConfig = {
  timeout: 30 * 1000,
  // baseURL: '/api',
};

const instance = axios.create(options);

const handleResponse = function (res: AxiosResponse<any>) {
  res.status !== 200 && console.log('%c status ', 'background: red; color: #fff', res.status);
  switch (res.status) {
    case 200:
      return Promise.resolve(res.data);
    case 203:
      message.error('请登录');
      const ssoCenter = res.data?.data?.ssoCenter;
      const originPath = window.location.pathname + window.location.search;
      if (ssoCenter) {
        window.location.href = `${ssoCenter}?server=${encodeURIComponent(window.location.href)}`
        return Promise.reject(new ErrorProcessor(res.status));;
      }
      history.push(originPath === '/' ? '/login' : `/login?redirect=${encodeURIComponent(originPath)}`);
      return Promise.reject(new ErrorProcessor(res.status));
    default:
      return Promise.reject(new ErrorProcessor(res.status));
  }
};

const axiosCatch = function (error: AxiosError) {
  if (error && error.response) {
    const response = error.response;
    const resData = response.data || {};
    switch (response.status) {
      // case 400:
      // case 500:
      // case 501:
      // case 502:
      // case 503:
      // case 504:
      //   return Promise.reject(new Error(resData.msg || resData.code || 'request error'));
      default:
        return Promise.reject(new Error(resData.msg || 'request error'));
    }
  }

  return Promise.reject(error);
}

instance.interceptors.response.use(response => {
  return handleResponse(response).then((resData: IResponse) => {
    if (resData.isSuccess) {
      return Promise.resolve(resData.data);
    } else {
      const msg = resData.msg;
      console.error('%c CATCH ERROR ', 'background: red; color: #fff', msg);
      return Promise.reject(msg);
    }
  });
}, error => {
  return axiosCatch(error);
});

export default (instance as IAxios);