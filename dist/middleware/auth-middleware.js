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
const handler_response_1 = require("../utils/handler-response");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
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
    (0, handler_response_1.buildApiResponse)(res, handler_response_1.HttpStatus.UNAUTHORIZED, handler_response_1.StatusMessage.UNAUTHORIZED);
});
exports.authMiddleware = authMiddleware;
