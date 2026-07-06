import {Request, Response, NextFunction} from "express"

export function handlerReadiness(req : Request, res:Response, next : NextFunction){
    res.set({"Content-type": "text/plain"})
    res.send({"body": "OK"})
}