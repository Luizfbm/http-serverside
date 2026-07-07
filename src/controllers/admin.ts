import {Request, Response, NextFunction} from "express"
import {config} from "../config.js"

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
export function reset(req: Request, res: Response, next: NextFunction){
    res.send(config.fileserverHits = 0)
    return config.fileserverHits
}
