import { Request, Response, NextFunction } from "express"

export function middlewareLogResponses(req: Request,res: Response, next: NextFunction){
  res.on("finish", () => {
      console.log(`Method: ${req.method} - Route: ${req.url} - Status: ${res.statusCode}`)
    })
    next()
}