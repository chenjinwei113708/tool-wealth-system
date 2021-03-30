const serverConf = require('./serverConfig');

module.exports = {
  network: {
    // port: 24000,
    ...serverConf,
  },
  database: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: ''
  },
  NODE_ENV: 'production'
};
