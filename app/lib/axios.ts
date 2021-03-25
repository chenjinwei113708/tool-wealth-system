import axios, { AxiosResponse, AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
// import axios from 'axios';
import log4js from 'util/log4js';

const logger = log4js('axios');

interface IAxios extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<IResponse>;
  (url: string, config?: AxiosRequestConfig): Promise<IResponse>;
}

export type IResponse = ReturnType <typeof dataTransform>;

/**
 * @param {boolean} isSuccess
 * @param {*} data
 * @param {object} others
 * @param {string} [others.msg]
 * @param {number} [others.code]
 */
const dataTransform = (isSuccess: boolean, data: any, others: any = {}) => ({
  isSuccess,
  data,
  msg: others.msg || (isSuccess ? 'ok' : 'request error'),
  code: others.code || 0,
});

const options = {
  timeout: 30 * 1000,
  // baseURL: '/',
};

const instance = axios.create(options);

const handleResponse = function (res: AxiosResponse) {
  switch (res.status) {
    case 200:
      return Promise.resolve(res.data);
    default:
      return Promise.reject(new Error('Error'));
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
        return Promise.reject(new Error(resData.msg || resData.message || resData.state?.msg || resData.code || resData.error || resData.state?.code || 'request error'));
    }
  }

  return Promise.reject(error);
}

const axiosThen = function (response: AxiosResponse) {
  const resHeaders = response.headers;
  return handleResponse(response).then(resData => {
    if (resData.code === 0 || resData.isSuccess) {
      return Promise.resolve(dataTransform(true, resData.data));
    } else if (resData.state?.code === 0) {
      return Promise.resolve(dataTransform(true, resData.data));
    } else {
      logger.error('[axiosThen]', {
        url: response.config.url,
        method: response.config.method,
        data: response.config.data,
        query: response.config.params,
        resData,
      });
      return Promise.resolve(dataTransform(false, null, {
        msg: resData.msg || resData.message || resData.state?.msg,
        code: resData.code ?? resData.state?.code,
      }));
    }
  }).catch(e => Promise.resolve(dataTransform(false, null, {
    msg: (e && e.message) || (e + ''),
    headers: response.headers || {},
  })));
};

// instance.interceptors.request.use(config => {
//   console.log(config.data)
//   return config;
// })

instance.interceptors.response.use((response): Promise<any> => {
  // 对响应数据做点什么
  return axiosThen(response);
}, (error) => {
  // 对响应错误做点什么
  // const reqData = (function () {
  //   try {
  //     return JSON.parse(error?.response?.config.data || '{}');
  //   } catch (e) {
  //     return {};
  //   }
  // })();
  // const params = (function () {
  //   if (error?.response?.config.params && typeof error.response.config.params === 'object') {
  //     return error.response.config.params;
  //   }
  //   try {
  //     return JSON.parse(error?.response?.config.params || '{}');
  //   } catch (e) {
  //     return {};
  //   }
  // })();
  const resConfig = error?.response?.config || {};
  logger.error('[interceptors]', {
    url: resConfig.url,
    method: resConfig.method,
    data: resConfig.data,
    query: resConfig.params,
    msg: error.response && error.response.data || error,
  });
  return axiosCatch(error).catch(e => Promise.resolve(dataTransform(false, null, {
    msg: (e && e.message) || (e + ''),
    code: ((error.response || {}).data || {}).code
  })));
});

export default (instance as IAxios);