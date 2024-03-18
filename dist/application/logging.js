"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};
const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};
winston_1.default.addColors(colors);
exports.logger = winston_1.default.createLogger({
    levels: logLevels,
    level: "debug",
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.Console({})
    ]
});
