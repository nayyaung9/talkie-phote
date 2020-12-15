"use strict";

const roomController = require("../controllers/room.controller");
const { catchError } = require("../libs/errorHandler");

module.exports = (app) => {
  app.route("/api/room").post(catchError(roomController.createRoom));
  app.route("/api/rooms").get(catchError(roomController.fetchAllRooms));

  app.route("/api/room/:id").get(catchError(roomController.fetchRoomById));

  app.route("/api/room").put(catchError(roomController.joinRoom));
};
