import {Request, Response, NextFunction} from "express"
import { BadRequestError } from "../errors.js"
import { createUser } from "../db/queries/user.js"
import { createChirp, getAllChirps, getChirpById } from "../db/queries/chirps.js"
import type {NewUser, NewChirp} from "../db/schema.js"
import {hashPassword, checkPasswordHash} from "../db/auth.js"

type reqBody = {
  body : string
  userId : string
}
const profane = ["kerfuffle","sharbert","fornax"]

const clean = (bodyReq: string) =>{
  const words = bodyReq.split(" ")
  let word = 0
  while (word < words.length){
    if (profane.includes(words[word].toLowerCase())){
      words[word] = "****"
    }
    word++
  }
  return words.join(" ")
  }

function handler(bodyHandler: string){    
  if (bodyHandler.length > 140){
      throw new BadRequestError("Chirp is too long. Max length is 140")
    }else{
        return clean(bodyHandler)
    }
}

export async function createChirpController(req: Request, res: Response, next: NextFunction){
    const messageChirp: NewChirp = {
        body : handler(req.body.body),
        userId : req.body.userId
    }
    if (!messageChirp.body){
        next()
    }
    const createdChirp = await createChirp(messageChirp)
    res.status(201).send(createdChirp)
}

export async function createUserController(req: Request, res: Response){
    const createWithEmailPass: NewUser = {
      password : typeof req.body.password == "string" ? await hashPassword(req.body.password): "unset",
      email: req.body.email 
    };
    console.log(createWithEmailPass.password)
    const createdUser = await createUser(createWithEmailPass);
    res.status(201).send(createdUser)
  }
export async function getChirpsController(req: Request, res: Response){
    console.log(await getAllChirps())
    res.status(200).send(await getAllChirps())
}  
async function validateIdChirp (idChirp:string | string[]) {
    if (typeof idChirp == "string"){
    const result = await getChirpById(idChirp)
    return result
  }
    throw new BadRequestError("This id don't exists")
}
export async function getChirpsByIdController(req: Request, res: Response){
  const chirpId = await validateIdChirp(req.params.id)
  const message = chirpId.message
  res.status(200).send({body : message})
} 