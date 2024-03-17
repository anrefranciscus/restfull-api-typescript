import {NextFunction, Response} from "express";
import {prismaClient} from "../application/database";
import {UserRequest} from "../type/user-request";
import {decodeJWT} from "../utils/auth";
import {JsonWebTokenError} from "jsonwebtoken";
import {buildApiResponse, HttpStatus, StatusMessage} from "../utils/handler-response";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.get("Authorization")

        if (authorizationHeader != null) {
            const decodedToken = decodeJWT(authorizationHeader)

            if(decodedToken) {
                const user = await prismaClient.user.findFirst({
                    where: {
                        token: authorizationHeader
                    }
                })

                if(user) {
                    req.user = user
                    next()
                    return
                }
            }
        }

        buildApiResponse(res, HttpStatus.UNAUTHORIZED, StatusMessage.UNAUTHORIZED)

    }catch (jwtError) {
        if (jwtError instanceof JsonWebTokenError) {
            buildApiResponse(res, HttpStatus.UNAUTHORIZED, StatusMessage.INVALID_TOKEN)
        }
        buildApiResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, StatusMessage.INTERNAL_SERVER_ERROR)
    }
}