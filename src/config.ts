import express  from "express"
import {Request , Response, NextFunction } from "express"
process.loadEnvFile()
type APIConfig = {
    dbURL : string, 
    fileserverHits: number;
};

const app = express()
const envOrThrow = (key: string | undefined) => {
    if (typeof key !== 'string'){
        throw new Error 
    }
    return key
}
const dbValidate = envOrThrow(process.env.DB_URL)
export const config : APIConfig = {
    dbURL: dbValidate,
    fileserverHits: 0
}
export function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {
    config.fileserverHits += 1
    next()
    return config.fileserverHits
    
}
export function reset(req: Request, res: Response, next: NextFunction){
    res.send(config.fileserverHits = 0)
    return config.fileserverHits
}

export function metrics(req: Request, res: Response, next: NextFunction){
    res.set({"Content-type": "text/html"})
    res.send(`
    <html>
        <body>
            <h1>Welcome, Chirpy Admin</h1>
            <p>Chirpy has been visited ${config.fileserverHits} times!</p>
        </body>
    </html>`
)
    //res.send(`Chirpy has been visited ${config.fileserverHits} times!`)
    //res.send(`Hits: ${config.fileserverHits}`
    return config.fileserverHits
    
}
