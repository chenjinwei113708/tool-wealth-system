const serverConf = require('./serverConfig');

module.exports = {
  network: {
    // port: 3026,
    ...serverConf,
  },
  database: {
    host: '10.10.15.61',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'jodo'
  },
  NODE_ENV: 'development'
};
