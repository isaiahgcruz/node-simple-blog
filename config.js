const config = {
  dev: {
    mongoUri: 'mongodb://localhost/simpleblog',
    jwtSecret: 'simpleblogsecret',
  },
  prod: {
    mongoUri: 'mongodb://localhost/simpleblog',
    jwtSecret: 'simpleblogsecret',
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports = config.prod;
} else {
  module.exports = config.dev;
}