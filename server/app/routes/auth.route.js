'use strict';

const authController = require('../controllers/auth.controller');
const { catchError } = require('../libs/errorHandler');

module.exports = app => {
  app.route('/api/authenticate').post(authController.authenticate);
};
