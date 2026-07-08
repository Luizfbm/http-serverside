import {Request, Response, NextFunction} from "express"
import { BadRequestError } from "../errors.js"
import { createUser } from "../db/queries/user.js"
import type {NewUser, NewChirp} from "../db/schema.js"

export async function handler(req: Request,res: Response, next: NextFunction){    
  type reqBody = {
    body : string
    userId : string
  }
  const profane = ["kerfuffle","sharbert","fornax"]
  const parseBody : reqBody  = req.body

  const clean = () =>{
    const words = parseBody.body.split(" ")
    let word = 0
    while (word < words.length){
      if (profane.includes(words[word].toLowerCase())){
        words[word] = "****"
      }
      word++
    }
    return words.join(" ")
    }

    if (parseBody.body.length > 140){
        throw new BadRequestError("Chirp is too long. Max length is 140")
    }else{
        res.send({"cleanedBody": clean()})
    }
  }
  export async function createUserController(req: Request, res: Response){
    const createWithEmail: NewUser = await {email: req.body.email};
    const createdUser = await createUser(createWithEmail);
    res.status(201).send(createdUser)
  }
