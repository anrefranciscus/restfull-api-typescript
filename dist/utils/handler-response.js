"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApiResponse = exports.StatusMessage = exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
var StatusMessage;
(function (StatusMessage) {
    StatusMessage["Success"] = "Success";
    StatusMessage["INVALID_TOKEN"] = "Invalid Token";
    StatusMessage["INTERNAL_SERVER_ERROR"] = "Internal Server Error";
    StatusMessage["LOGOUT"] = "You has been logout";
    StatusMessage["UNAUTHORIZED"] = "Unauthorized";
})(StatusMessage || (exports.StatusMessage = StatusMessage = {}));
function buildApiResponse(res, statusCode, statusMessage, data) {
    const responseBody = { statusCode, statusMessage };
    if (data) {
        responseBody.data = data;
    }
    res.status(statusCode).json(responseBody);
}
exports.buildApiResponse = buildApiResponse;
