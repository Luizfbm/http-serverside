import {Router} from 'express'
import {handlerReadiness} from "../controllers/healthz.js"
import {createChirpController, getChirpsController,getChirpsByIdController} from "../controllers/chirps.js"
import {createUserController, loginController} from "../controllers/users.js"
import {getBearerToken} from "../db/auth.js"
export const apiRouter = Router()

apiRouter.get("/healthz",handlerReadiness);
apiRouter.post("/users",createUserController)
apiRouter.post("/login", loginController)
apiRouter.post("/chirps",getBearerToken, createChirpController)
apiRouter.get("/chirps",getBearerToken, getChirpsController)
apiRouter.get("/chirps/:id",getBearerToken, getChirpsByIdController)


