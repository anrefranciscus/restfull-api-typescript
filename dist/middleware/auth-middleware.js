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
exports.authMiddleware = void 0;
const database_1 = require("../application/database");
const auth_1 = require("../utils/auth");
const jsonwebtoken_1 = require("jsonwebtoken");
const handler_response_1 = require("../utils/handler-response");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.get("Authorization");
        if (authorizationHeader != null) {
            const decodedToken = (0, auth_1.decodeJWT)(authorizationHeader);
            if (decodedToken) {
                const user = yield database_1.prismaClient.user.findFirst({
                    where: {
                        token: authorizationHeader
                    }
                });
                if (user) {
                    req.user = user;
                    next();
                    return;
                }
            }
        }
        (0, handler_response_1.buildApiResponse)(res, handler_response_1.HttpStatus.UNAUTHORIZED, handler_response_1.StatusMessage.UNAUTHORIZED);
    }
    catch (jwtError) {
        if (jwtError instanceof jsonwebtoken_1.JsonWebTokenError) {
            (0, handler_response_1.buildApiResponse)(res, handler_response_1.HttpStatus.UNAUTHORIZED, handler_response_1.StatusMessage.INVALID_TOKEN);
        }
        (0, handler_response_1.buildApiResponse)(res, handler_response_1.HttpStatus.INTERNAL_SERVER_ERROR, handler_response_1.StatusMessage.INTERNAL_SERVER_ERROR);
    }
});
exports.authMiddleware = authMiddleware;
