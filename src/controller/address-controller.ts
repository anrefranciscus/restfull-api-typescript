import {UserRequest} from "../type/user-request";
import {NextFunction, Response} from "express";
import {
    CreateAddressRequest,
    GetAddressRequest,
    RemoveAddressRequest,
    UpdateAddressRequest
} from "../model/address-model";
import {AddressService} from "../service/address-service";
import {buildApiResponse, HttpStatus, StatusMessage} from "../utils/handler-response";
import {logger} from "../application/logging";

export class AddressController {

    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request : CreateAddressRequest = req.body as CreateAddressRequest
            request.contact_id = Number(req.params.contactId)

            const response = await AddressService.create(req.user!, request)
            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success, response)
        }catch (e) {
            next(e)
        }
    }
    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request : GetAddressRequest = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId)
            }
            const response = await AddressService.get(req.user!, request)
            logger.debug("response " + JSON.stringify(response))
            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success, response)
        }catch (e){
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request : UpdateAddressRequest = req.body as UpdateAddressRequest
            request.contact_id = Number(req.params.contact_id)
            request.id = Number(req.params.addressId)

            const response = await AddressService.update(req.user!, request)
            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success, response)
        }catch (e) {
            next(e)
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request : RemoveAddressRequest = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId)
            }

            await AddressService.get(req.user!, request)

            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success, "Success delete your address")

        }catch (e){
            next(e)
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId)

            const response = await AddressService.list(req.user!, contactId)
            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success, response)
        }catch (e){
            next(e)
        }
    }
}
