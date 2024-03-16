"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJWT = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = "abc123";
const generateToken = (username) => {
    return jsonwebtoken_1.default.sign({ username }, jwtSecret, {
        expiresIn: "1h"
    });
};
exports.generateToken = generateToken;
const decodeJWT = (token) => {
    return jsonwebtoken_1.default.verify(token, jwtSecret);
};
exports.decodeJWT = decodeJWT;
