import {Request, Response, NextFunction} from "express"
import { BadRequestError } from "../errors.js"
import {NewUser, users} from "../db/schema.js"
import {db} from "../db/index.js"

export async function handler(req: Request,res: Response, next: NextFunction){    
  type reqBody = {
    body : string
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

const insertUser = async (user : NewUser) =>{
    return await db.insert(users).values(user)
}
export async function createUser(req: Request, res : Response){
    const newUser : NewUser= {email : req.body.email}
    await insertUser(newUser)
    const result = await db.select().from(users)
    console.log(result)
    res.status(201).send(result)
}
