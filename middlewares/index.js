const errorHandler = require('./errorhandler')
const notFoundHandler = require('./notfoundhandler')
const auth = require('./auth')

module.exports = {
    errorHandler,
    notFoundHandler,
    auth,
}