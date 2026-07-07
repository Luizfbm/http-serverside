import {Request, Response, NextFunction} from "express"
import {config} from "../config.js"
import {users} from "../db/schema.js"
import {db} from "../db/index.js"

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
export async function reset(req: Request, res: Response, next: NextFunction){
    await db.delete(users)
    config.fileserverHits = 0
    res.sendStatus(200).send(config.fileserverHits)
}
