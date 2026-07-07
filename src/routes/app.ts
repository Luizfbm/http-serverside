import {Router} from 'express'
import {middlewareMetricsInc} from "../middleware/metrics.js"
import express from "express"
export const appRouter = Router()

appRouter.use("/",middlewareMetricsInc, express.static("./src/app"));