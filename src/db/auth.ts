import * as argon2 from "argon2"
import { BadRequestError, Unauthorized, errorHandler} from "../errors.js"
import jwt from "jsonwebtoken"
import type { JwtPayload } from "jsonwebtoken";

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

function makeJWT(userID:string, expiresIn: number, secret: string): string{
    jwt.sign(payload, secret, [options])
}
export async function hashPassword(password: string): Promise<string>{
    const hash = await argon2.hash(password)
    return hash
}
export async function checkPasswordHash(password: string, hash: string): Promise<boolean>{
    const result = await argon2.verify(password, hash)
    if (result){
        return true
    }else{
        throw new Unauthorized("401")
    }
}