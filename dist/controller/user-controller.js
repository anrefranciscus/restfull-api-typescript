"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user-service");
const handler_response_1 = require("../utils/handler-response");
class UserController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield user_service_1.UserService.register(request);
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield user_service_1.UserService.login(request);
                (0, handler_response_1.buildApiResponse)(res, handler_response_1.HttpStatus.OK, handler_response_1.StatusMessage.Success, response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield user_service_1.UserService.get(req.user);
                (0, handler_response_1.buildApiResponse)(res, handler_response_1.HttpStatus.OK, handler_response_1.StatusMessage.Success, response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield user_service_1.UserService.update(req.user, request);
                (0, handler_response_1.buildApiResponse)(res, handler_response_1.HttpStatus.OK, handler_response_1.StatusMessage.Success, response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield user_service_1.UserService.logout(req.user);
                (0, handler_response_1.buildApiResponse)(res, handler_response_1.HttpStatus.OK, handler_response_1.StatusMessage.Success, handler_response_1.StatusMessage.LOGOUT);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.UserController = UserController;
