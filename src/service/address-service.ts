import {Address, User} from "@prisma/client";
import {
    AddressResponse,
    CreateAddressRequest,
    GetAddressRequest, RemoveAddressRequest,
    toAddressResponse,
    UpdateAddressRequest
} from "../model/address-model";
import {Validation} from "../validation/validation";
import {AddressValidation} from "../validation/address-validation";
import {ContactService} from "./contact-service";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";

export class AddressService {

    static async create(user: User, request: CreateAddressRequest) : Promise<AddressResponse> {
        const createRequest = Validation.validate(AddressValidation.Create, request)
        await ContactService.checkContactMustExist(user.username, request.contact_id)

        const address = await prismaClient.address.create({
            data: createRequest
        })

        return toAddressResponse(address)
    }

    static async checkAdressMustExist(contactId: number, addressId: number) : Promise<Address> {
        const address = await prismaClient.address.findFirst({
            where: {
                id: addressId,
                contact_id: contactId
            }
        })

        if(!address) {
            throw new ResponseError(404, "Address is not found")
        }
        return address
    }

    static async get(user: User, request: GetAddressRequest) : Promise<AddressResponse> {
        const getRequest = Validation.validate(AddressValidation.GET, request)
        await ContactService.checkContactMustExist(user.username, request.contact_id)
        const address = await this.checkAdressMustExist(getRequest.contact_id, getRequest.id)

        return toAddressResponse(address)
    }

    static async update(user: User, request: UpdateAddressRequest) : Promise<AddressResponse> {
        const updateRequest = Validation.validate(AddressValidation.Update, request)
        await ContactService.checkContactMustExist(user.username, request.contact_id)
        await this.checkAdressMustExist(updateRequest.contact_id, updateRequest.id)

        const address = await prismaClient.address.update({
            where: {
                id: updateRequest.id,
                contact_id: updateRequest.contact_id
            },
            data: updateRequest
        })

        return toAddressResponse(address)

    }

    static async remove(user: User, request: RemoveAddressRequest) : Promise<AddressResponse> {
        const removeAddressRequest = Validation.validate(AddressValidation.GET, request)
        await ContactService.checkContactMustExist(user.username, request.contact_id)
        await this.checkAdressMustExist(removeAddressRequest.contact_id, removeAddressRequest.id)

        const address = await prismaClient.address.delete({
            where: {
                id: removeAddressRequest.id,
            }
        })

        return toAddressResponse(address)
    }

    static async list(user: User, contactId: number) : Promise<Array<AddressResponse>> {
        await ContactService.checkContactMustExist(user.username, contactId)

        const addresses = await prismaClient.address.findMany({
            where: {
                contact_id: contactId
            }
        })

        return addresses.map((address) => toAddressResponse(address))
    }
}