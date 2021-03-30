const env = process.env.NODE_ENV || 'production';

module.exports = {
  port: env === 'production' ? 24000 : 3029,
}