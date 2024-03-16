import {Response, NextFunction} from "express";
import {prismaClient} from "../application/database";
import {UserRequest} from "../type/user-request";
import {decodeJWT} from "../utils/auth";
import {JsonWebTokenError} from "jsonwebtoken";
import {ResponseError} from "../error/response-error";

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

        res.status(401).json({
            errors: "Unauthorized"
        }).end()

    }catch (jwtError) {
        if (jwtError instanceof JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}