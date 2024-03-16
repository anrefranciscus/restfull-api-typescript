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
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    }
    catch (jwtError) {
        if (jwtError instanceof jsonwebtoken_1.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.authMiddleware = authMiddleware;
