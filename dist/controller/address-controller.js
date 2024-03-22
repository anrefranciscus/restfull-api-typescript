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
exports.AddressController = void 0;
const address_service_1 = require("../service/address-service");
const handler_response_1 = require("../utils/handler-response");
const logging_1 = require("../application/logging");
class AddressController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.contact_id = Number(req.params.contactId);
                const response = yield address_service_1.AddressService.create(req.user, request);
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
                const request = {
                    id: Number(req.params.addressId),
                    contact_id: Number(req.params.contactId)
                };
                const response = yield address_service_1.AddressService.get(req.user, request);
                logging_1.logger.debug("response " + JSON.stringify(response));
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
                request.contact_id = Number(req.params.contactId);
                request.id = Number(req.params.addressId);
                const response = yield address_service_1.AddressService.update(req.user, request);
                (0, handler_response_1.buildApiResponse)(res, handler_response_1.HttpStatus.OK, handler_response_1.StatusMessage.Success, response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    id: Number(req.params.addressId),
                    contact_id: Number(req.params.contactId)
                };
                yield address_service_1.AddressService.get(req.user, request);
                (0, handler_response_1.buildApiResponse)(res, handler_response_1.HttpStatus.OK, handler_response_1.StatusMessage.Success, "Success delete your address");
            }
            catch (e) {
                next(e);
            }
        });
    }
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactId = Number(req.params.contactId);
                const response = yield address_service_1.AddressService.list(req.user, contactId);
                (0, handler_response_1.buildApiResponse)(res, handler_response_1.HttpStatus.OK, handler_response_1.StatusMessage.Success, response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.AddressController = AddressController;
