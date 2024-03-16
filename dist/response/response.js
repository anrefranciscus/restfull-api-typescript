"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBuilder = exports.StatusCode = exports.StatusMessage = void 0;
var StatusMessage;
(function (StatusMessage) {
    StatusMessage["Success"] = "Success";
    StatusMessage["SuccessfullyLogout"] = "Successfully Logout";
    StatusMessage["Unauthorized"] = "Unauthorized";
    StatusMessage["InvalidToken"] = "Invalid Token";
    StatusMessage["InternalServerError"] = "Internal Server Error ";
    StatusMessage["UsernameAlreadyExist"] = "username already exist";
    StatusMessage["InvalidUsernameOrPassword"] = "Username or password is wrong";
})(StatusMessage || (exports.StatusMessage = StatusMessage = {}));
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["Success"] = 200] = "Success";
    StatusCode[StatusCode["Unauthorized"] = 401] = "Unauthorized";
    StatusCode[StatusCode["InternalServerError"] = 500] = "InternalServerError";
    StatusCode[StatusCode["BadRequest"] = 400] = "BadRequest";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
class ResponseBuilder {
    static sendSuccess(res, data, message = StatusMessage.Success) {
        res.status(StatusCode.Success).json({ success: true, data, message });
    }
    static sendError(res, statusCode, message) {
        res.status(statusCode).json({ success: false, message });
    }
}
exports.ResponseBuilder = ResponseBuilder;
