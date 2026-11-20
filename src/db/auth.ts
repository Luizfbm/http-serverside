import * as argon2 from "argon2"
import { BadRequestError, Unauthorized, errorHandler} from "../errors.js"
import jwt from "jsonwebtoken"
import type { JwtPayload } from "jsonwebtoken";
import {Request, Response, NextFunction} from "express"
import {config } from "../config.js"

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;
const nowTime = Math.floor(Date.now()/1000)
export function makeJWT(userID:string, expiresIn: number, secret: string): string{
    const payload: payload = {
        iss: "chirp",
        sub: userID,
        iat: nowTime,
        exp:  nowTime + expiresIn
    }
    JSON.stringify(payload)
    return jwt.sign(payload, secret)
}
export function validateJWT(tokenString: string, secret: string): string{
    const response = jwt.verify(tokenString, secret)
    if(!response){
        throw new Error(`Invalid or expired token ${response.sub}`)
    }
    return JSON.stringify(response)
}

export async function hashPassword(password: string): Promise<string>{
    const hash = await argon2.hash(password)
    return hash
}
export async function checkPasswordHash(password: string, hash: string): Promise<boolean>{
    const result = await argon2.verify(hash, password)
    if (result){
        return true
    }else{
        throw new Unauthorized("401")
    }
}
export function getBearerToken(req: Request): string{
    const token = req.get("Authorization")
    if(!token){
        throw new Error
    }
    let tokenClear = token.slice(-8)
    const valJWT = validateJWT(tokenClear ,config.secretJWT)
    return valJWT
}