import {Router} from 'express'
import {handlerReadiness} from "../controllers/healthz.js"
import {handler} from "../errors.js"
export const apiRouter = Router()

apiRouter.get("/healthz",handlerReadiness);
apiRouter.post("/validate", handler)