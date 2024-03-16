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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const web_1 = require("../application/web");
const logging_1 = require("../application/logging");
const test_util_1 = require("./test-util");
describe('POST /api/users', () => {
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    it('should reject register new user if request invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/users")
            .send({
            username: "",
            password: "",
            name: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
    it('should register new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/users")
            .send({
            username: "test",
            password: "test",
            name: "test",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    }));
});
describe('POST /api/users/login', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    it('should be able to login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/users/login")
            .send({
            username: "test",
            password: "test"
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.token).toBeDefined();
    }));
    it('should reject login if username is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/users/login")
            .send({
            username: "salah",
            password: "test"
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
});
describe('DELETE /api/users/current', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    it('should be able to logout', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("ok");
        const user = yield test_util_1.UserTest.get();
        expect(user.token).toBe(null);
    }));
});
