  import {Request, Response, NextFunction} from "express"
  import {hashPassword, checkPasswordHash} from "../db/auth.js"
  import { createUser, getUserByEmail,getUserByPass } from "../db/queries/user.js"
  import type {NewUser, UserResponse} from "../db/schema.js"
  import { BadRequestError, Unauthorized } from "../errors.js"

  export async function createUserController(req: Request, res: Response){
    const createWithEmailPass: NewUser = {
      password : typeof req.body.password == "string" ? await hashPassword(req.body.password): "unset",
      email: req.body.email 
    };
    const createdUser : UserResponse = await createUser(createWithEmailPass);
    res.status(201).send({
      id:createdUser.id,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
      email: createdUser.email
    })
  }

export async function loginController(req: Request, res: Response){
  const userEmail = await getUserByEmail(req.body.email)
  if (!userEmail.email){
    throw new Unauthorized("This email don't exists")
  }
  if(await checkPasswordHash(userEmail.password,req.body.password) == false){
     throw new BadRequestError("401")
  }
  res.status(200).send({
      id:userEmail.id,
      createdAt: userEmail.createdAt,
      updatedAt: userEmail.updatedAt,
      email: userEmail.email
    })
}