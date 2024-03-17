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
exports.ContactController = void 0;
const contact_service_1 = require("../service/contact-service");
const logging_1 = require("../application/logging");
const handler_response_1 = require("../utils/handler-response");
class ContactController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = contact_service_1.ContactService.create(req.user, request);
                logging_1.logger.debug("response", response);
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
                const contactId = Number(req.params.contactId);
                const response = contact_service_1.ContactService.get(req.user, contactId);
                (0, handler_response_1.buildApiResponse)(res, handler_response_1.HttpStatus.OK, handler_response_1.StatusMessage.Success, response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ContactController = ContactController;
