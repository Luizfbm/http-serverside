import {Request, Response, NextFunction} from "express"

export class BadRequestError extends Error{
  constructor(message: string){
    super(message)
  }
}
export class Unauthorized extends Error{
  constructor(message: string){
    super(message)
  }
}
export class Forbidden extends Error{
  constructor(message: string){
    super(message)
  }
}

export class NotFoundError extends Error{
  constructor(message: string){
    super(message)
  }
}
export async function errorHandler (err: Error, req: Request, res: Response, next: NextFunction){
  if(err instanceof BadRequestError){
    res.status(400).send({"error" : "Chirp is too long. Max length is 140"})
  }
  if(err instanceof Unauthorized){
    res.status(401).send()
  }
  if(err instanceof Forbidden){
    res.status(403).send()
  }
  if(err instanceof NotFoundError){
    res.status(404).send({"error": "Something went wrong on our end"})}
}
