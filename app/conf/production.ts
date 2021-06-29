export default {
  network: {
    port: 24000,

    serverHost: 'http://tool-cash-back-service-alihktest.k8sstudio.com',
    ssoCenter: 'https://jodo-sso-center-alihktest.k8sstudio.com',
    // 数据平台代码查询
    dataCodeServerHost: 'https://jodo-analytics-aliyun-alihk01.k8sstudio.com',
  },

  database: {
    host: '10.10.0.19',
    port: 3306,
    user: 'developer',
    password: 'jodoedev@ss',
    database: 'tools_wealth_system',
    dateStrings: true,
  },

  ssoEnv: 'prod',
};
