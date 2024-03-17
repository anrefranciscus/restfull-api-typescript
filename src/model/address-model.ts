import {Address} from "@prisma/client";
import {add} from "winston";

export type AddressModel = {
    id: number,
    street?: string | null,
    city?: string | null,
    province?: string | null,
    country: string,
    postal_code: string
}

export type CreateAddressRequest = {
    id: number,
    street?: string | null,
    city?: string | null,
    province?: string | null,
    country: string,
    postal_code: string
}

export const toAddressResponse = (address: Address) => {
    return {
        id: address.id,
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        postal_code: address.postal_code
    }
}