"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAddressResponse = void 0;
const toAddressResponse = (address) => {
    return {
        id: address.id,
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        postal_code: address.postal_code
    };
};
exports.toAddressResponse = toAddressResponse;
