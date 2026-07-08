import {Router} from 'express'
import {handlerReadiness} from "../controllers/healthz.js"
import {handler} from "../controllers/chirps.js"
import {createUserController} from "../controllers/chirps.js"
export const apiRouter = Router()

apiRouter.get("/healthz",handlerReadiness);
apiRouter.post("/validate", handler)
apiRouter.post("/users",createUserController)
apiRouter.post("/chirps",handler)