export default {
  network: {
    port: 5002,

    serverHost: 'http://tool-cash-back-service-alihktest.k8sstudio.com',
    // serverHost: 'http://10.10.10.250:8080',
    ssoCenter: 'http://localhost:7012',

    // 数据平台代码查询
    dataCodeServerHost: 'https://data.jodoplay.com',
  },

  database: {
    host: '10.10.0.19',
    port: 3306,
    user: 'developer',
    password: 'jodoedev@ss',
    database: 'tools_wealth_system',
    dateStrings: true,
  },
};
