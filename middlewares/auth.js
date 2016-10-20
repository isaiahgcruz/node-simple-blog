const expressJWT = require('express-jwt')
const config = require('../config')

exports.default = expressJWT({ secret: config.jwtSecret })
  .unless({ path: ['/login', '/register']});

module.exports = exports.default;