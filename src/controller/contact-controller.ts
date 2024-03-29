import {UserRequest} from "../type/user-request";
import {NextFunction, Response} from "express";
import {CreateContactRequest, SearchContactRequest, UpdateContactRequest} from "../model/contact-model";
import {ContactService} from "../service/contact-service";
import {logger} from "../application/logging";
import {buildApiResponse, HttpStatus, StatusMessage} from "../utils/handler-response";

export class ContactController {

    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateContactRequest = req.body as CreateContactRequest
            const response = await ContactService.create(req.user!, request)
            logger.debug("response", response)
            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success, response)
        }catch (e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId)
            const response = await ContactService.get(req.user!, contactId)
            logger.debug("response : " + JSON.stringify(response))
            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success, response)
        }catch (e) {
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateContactRequest = req.body as UpdateContactRequest
            request.id = Number(req.params.contactId)
            const response = await ContactService.update(req.user!, request)
            logger.debug("response", response)
            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success, response)
        }catch (e) {
            next(e)
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId)
            const response = await ContactService.remove(req.user!, contactId)
            logger.debug("response", response)
            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success, StatusMessage.Success)
        }catch (e) {
            next(e)
        }
    }

    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchContactRequest = {
                name: req.query.name as string,
                phone: req.query.phone as string,
                email: req.query.email as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10
            }
            const response = await ContactService.search(req.user!, request)
            logger.debug("response", response)
            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success, response)
        }catch (e) {
            next(e)
        }
    }
}