
import { Response } from 'express';
export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum StatusMessage {
    Success = "Success",
    INVALID_TOKEN = "Invalid Token",
    INTERNAL_SERVER_ERROR= "Internal Server Error",
    LOGOUT = "You has been logout",
    UNAUTHORIZED = 'Unauthorized'
}
interface ApiResponse<T> {
    statusCode: HttpStatus,
    statusMessage: string,
    data?: any
}

export function buildApiResponse<T> (
    res: Response,
    statusCode: HttpStatus,
    statusMessage: string,
    data?: T
) : void {
    const responseBody: ApiResponse<T> = {statusCode, statusMessage};
    if (data) {
        responseBody.data = data
    }
    res.status(statusCode).json(responseBody)
}