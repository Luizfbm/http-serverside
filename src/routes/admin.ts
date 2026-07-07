import {Router} from 'express'
import {metrics, reset} from "../controllers/admin.js"


export const adminRouter = Router()

adminRouter.get("/metrics",metrics)

adminRouter.post("/reset", reset)

