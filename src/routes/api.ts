import {Router} from 'express'
import {handlerReadiness} from "../controllers/healthz.js"
import {createUserController, createChirpController} from "../controllers/chirps.js"
export const apiRouter = Router()

apiRouter.get("/healthz",handlerReadiness);
apiRouter.post("/users",createUserController)
apiRouter.post("/chirps",createChirpController)