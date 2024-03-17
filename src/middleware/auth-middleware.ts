import {NextFunction, Response} from "express";
import {prismaClient} from "../application/database";
import {UserRequest} from "../type/user-request";
import {buildApiResponse, HttpStatus, StatusMessage} from "../utils/handler-response";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization

    if(authorizationHeader) {
        const user = await prismaClient.user.findFirst({
            where: {
                token: authorizationHeader
            }
        })

        if (user) {
            req.user = user
            next()
            return
        }
    }
    buildApiResponse(res, HttpStatus.UNAUTHORIZED, StatusMessage.UNAUTHORIZED)
}