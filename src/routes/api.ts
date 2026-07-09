import {Router} from 'express'
import {handlerReadiness} from "../controllers/healthz.js"
import {createUserController, createChirpController, getChirpsController} from "../controllers/chirps.js"
export const apiRouter = Router()

apiRouter.get("/healthz",handlerReadiness);
apiRouter.post("/users",createUserController)
apiRouter.post("/chirps",createChirpController)
apiRouter.get("/chirps",getChirpsController)
