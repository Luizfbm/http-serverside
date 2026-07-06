import {Router} from 'express'
import {middlewareMetricsInc} from "../controllers/admin.js"
export const appRouter = Router()

appRouter.use("/",middlewareMetricsInc);