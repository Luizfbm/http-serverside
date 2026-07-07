import {Router} from 'express'
import {metrics, reset} from "../controllers/admin.js"


const adminRouter = Router()

adminRouter.get("/metrics",metrics)

adminRouter.post("/reset", reset)

export default adminRouter