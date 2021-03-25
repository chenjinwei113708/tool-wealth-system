import consola from 'consola';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { port } from '../../conf/serverConfig';

const options: AxiosRequestConfig = {
  timeout: 30 * 1000,
  baseURL: '/api',
};

// process.server 存在表示第一次从服务端获取数据
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || port || 3026}/api`;
  options.withCredentials = true;
}

const instance = axios.create(options);

const handleResponse = function (res: AxiosResponse) {
  // res.status !== 200 && consola.log('%c status ', 'background: red; color: #fff', res.status);
  res.status !== 200 && consola.log('status ',res.status);
  switch (res.status) {
    case 200:
      return Promise.resolve(res.data);
    // case 203:
    //   window.location.href = '/login';
    //   return Promise.reject(new Error('登录失效，请重新登录'));
    default:
      // return Promise.reject(new Error('登录失效，请重新登录'));
      return Promise.reject(new Error('Error'));
  }
};

const axiosThen = function (response: AxiosResponse) {
  return handleResponse(response).then(resData => {
    if (resData.isSuccess || (resData.isSuccess === undefined && !resData.errors)) {
      return Promise.resolve(resData.data);
    } else {
      if (resData.errors) {
        consola.error('CATCH ERROR ', resData.errors);
        return Promise.reject(new Error(resData.errors.map((item: any) => item.message).join(', ')));
      } else {
        consola.error('CATCH ERROR ', resData.msg);
        return Promise.reject(new Error(resData.msg));
      }
    }
  });
};

instance.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return axiosThen(response);
}, (error) => {
  // 对响应错误做点什么
  console.error('CATCH ERROR ', error);
  return Promise.reject(error);
});

export default instance;
