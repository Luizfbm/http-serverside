import express from "express";
import {Request, Response, NextFunction} from "express"
import {middlewareMetricsInc, reset,metrics } from "./config.js"
const app = express();
const PORT = 8080;

app.use(middlewareLogResponses)
app.use(express.json())

class BadRequestError extends Error{
  constructor(message: string){
    super(message)
  }
}
class Unauthorized extends Error{
  constructor(message: string){
    super(message)
  }
}
class Forbidden extends Error{
  constructor(message: string){
    super(message)
  }
}

class NotFoundError extends Error{
  constructor(message: string){
    super(message)
  }
}

function handlerReadiness(req : Request, res:Response, next : NextFunction){
    res.set({"Content-type": "text/plain"})
    res.send({"body": "OK"})
}

app.get("/api/healthz",handlerReadiness);

app.use("/app",middlewareMetricsInc, express.static("./src/app"));

function middlewareLogResponses(req: Request,res: Response, next: NextFunction){
  res.on("finish", () => {
      console.log(`Method: ${req.method} - Route: ${req.url} - Status: ${res.statusCode}`)
    })
    next()
}

async function handler(req: Request,res: Response, next: NextFunction){
  type reqBody = {
    body : string
  }
  const profane = ["kerfuffle","sharbert","fornax"]
  const parseBody : reqBody  = req.body

  const clean = () =>{
    const words = parseBody.body.split(" ")
    let word = 0
    while (word < words.length){
      if (profane.includes(words[word].toLowerCase())){
        words[word] = "****"
      }
      word++
    }
    return words.join(" ")
    }

    if (parseBody.body.length > 140){
      throw new BadRequestError("Chirp is too long. Max length is 140")
      res.status(400).json({ "error": 'Chirp is too long' });
    }else{
      res.send({"cleanedBody": clean()})
    }
  }

app.post("/api/validate_chirp",handler)

app.get("/admin/metrics",metrics)

app.post("/admin/reset", reset)

async function errorHandler (err: Error, req: Request, res: Response, next: NextFunction){
  if(err instanceof BadRequestError){
    res.status(400).send({"error" : "Chirp is too long. Max length is 140"})
  }
  if(err instanceof Unauthorized){
    res.status(401).send()
  }
  if(err instanceof Forbidden){
    res.status(403).send()
  }
  if(err instanceof NotFoundError){
    res.status(404).send({"error": "Something went wrong on our end"})}
}

app.use(errorHandler)
app.listen(PORT
  , () => {
  console.log(`Server is running attheres http://localhost:${PORT}`);
  }
);