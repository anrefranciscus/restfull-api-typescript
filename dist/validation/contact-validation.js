"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactValidation = void 0;
const zod_1 = require("zod");
class ContactValidation {
}
exports.ContactValidation = ContactValidation;
ContactValidation.Create = zod_1.z.object({
    first_name: zod_1.z.string().min(1).max(100),
    last_name: zod_1.z.string().min(1).max(100),
    email: zod_1.z.string().min(1).max(100).email().optional(),
    phone: zod_1.z.string().min(1).max(20).optional(),
});
ContactValidation.Update = zod_1.z.object({
    id: zod_1.z.number().positive(),
    first_name: zod_1.z.string().min(1).max(100),
    last_name: zod_1.z.string().min(1).max(100),
    email: zod_1.z.string().min(1).max(100).email().optional(),
    phone: zod_1.z.string().min(1).max(20).optional(),
});
ContactValidation.Search = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    phone: zod_1.z.string().min(1).optional(),
    email: zod_1.z.string().min(1).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).positive()
});
