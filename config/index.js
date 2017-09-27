var env = process.env.NODE_ENV || 'dev',
  cfg = require('../config/config.' + env + '.js');

module.exports = cfg;