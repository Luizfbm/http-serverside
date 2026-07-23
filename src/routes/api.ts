import {Router} from 'express'
import {handlerReadiness} from "../controllers/healthz.js"
import {createUserController, createChirpController, getChirpsController,getChirpsByIdController, loginController} from "../controllers/chirps.js"
export const apiRouter = Router()

apiRouter.get("/healthz",handlerReadiness);
apiRouter.post("/users",createUserController)
apiRouter.post("/login", loginController)
apiRouter.post("/chirps",createChirpController)
apiRouter.get("/chirps",getChirpsController)
apiRouter.get("/chirps/:id",getChirpsByIdController)


