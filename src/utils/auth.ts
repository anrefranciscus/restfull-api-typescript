import jwt from "jsonwebtoken";

const jwtSecret = "abc123"
export const generateToken = ( username: string) => {
    return jwt.sign(
        {username},
        jwtSecret,
        {
            expiresIn: "1h"
        }
    )
}
export const decodeJWT = (token: string) => {
    return jwt.verify(token, jwtSecret)
}
