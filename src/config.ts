import express  from "express"
import {Request , Response, NextFunction } from "express"
type APIConfig = {
  fileserverHits: number;
};

const app = express()
let x = 0
const config : APIConfig = {
    fileserverHits: 0
}
function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {
    
    res.on("finish", () => {
        config.fileserverHits = config.fileserverHits + 1 
        console.log("Hits: ", config.fileserverHits)
        return x
    })

    app.use("/metrics",(req, res, next)=>{
    res.send(config.fileserverHits)
} )
    app.use("/reset",(req, res, next)=>{
    config.fileserverHits = 0
    res.send(config.fileserverHits)
})
    next()
}

export default middlewareMetricsInc