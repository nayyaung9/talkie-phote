const path = require('path'),
  rootPath = path.normalize(__dirname + '/..');
  require('dotenv').config();
  env = process.env.NODE_ENV || 'production';

const config = {
  test: {
    root: rootPath,
    app: {
      name: 'talkie-phote',
    },
    port: 27017,
    db: 'mongodb://localhost:27017/talkie-phote',
    jwtSecret: process.env.jwtSecret,
    cloudinary: {
      name: process.env.cloudName,
      api_key: process.env.cloudinaryKey,
      api_secret: process.env.cloudinarySecret,
    },
  },
  production: {
    root: rootPath,
    app: {
      name: 'talkie-phote',
    },
    port: 27017,
    // db: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds229088.mlab.com:29088/mmscience`,
    jwtSecret: process.env.jwtSecret,
    cloudinary: {
      name: process.env.cloudName,
      api_key: process.env.cloudinaryKey,
      api_secret: process.env.cloudinarySecret,
    },
  },
}

module.exports = config[env];
