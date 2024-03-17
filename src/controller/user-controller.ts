import {NextFunction, Request, Response} from "express";
import {CreateUserRequest, LoginUserRequest, UpdateUserRequest,} from "../model/user-model";
import {UserService} from "../service/user-service";
import {UserRequest} from "../type/user-request";
import {buildApiResponse, HttpStatus, StatusMessage} from "../utils/handler-response";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest;
            const response = await UserService.register(request);
            res.status(200).json({
                data: response
            })
        }catch (e) {
            next(e)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const response = await UserService.login(request);
            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success,response)
        }catch (e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.get(req.user!)
            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success, response)
        }catch (e) {
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateUserRequest = req.body as UpdateUserRequest
            const response = await UserService.update(req.user!, request)
            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success, response)
        } catch (e) {
            next(e)
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.logout(req.user!)
            buildApiResponse(res, HttpStatus.OK, StatusMessage.Success, StatusMessage.LOGOUT)
        } catch (e) {
            next(e)
        }
    }

}