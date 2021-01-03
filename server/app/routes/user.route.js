"use strict";

const userController = require("../controllers/user.controller");
const { catchError } = require("../libs/errorHandler");

module.exports = (app) => {
  app.route("/api/users").get(catchError(userController.fetchAllUsers));
};
