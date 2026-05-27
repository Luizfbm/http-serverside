import express from "express";
import {Request, Response, NextFunction} from "express"
import {middlewareMetricsInc, reset,metrics } from "./config.js"
const app = express();
const PORT = 8080;

app.use(middlewareLogResponses)
app.use(express.json())

function handlerReadiness(req : Request, res:Response, next : NextFunction){
    res.set({"Content-type": "text/plain"})
    res.send({"body": "OK"})
}
app.get("/api/healthz",handlerReadiness);
app.use("/app",middlewareMetricsInc, express.static("./src/app"));

function middlewareLogResponses(req: Request,res: Response, next: NextFunction){
  res.on("finish", () => {
      console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`)
    })
    next()
  }

async function handler(req: Request,res: Response, next: NextFunction){
  type reqBody = {
    body : string
  }
  const parseBody : reqBody  = req.body
  if (parseBody.body.length > 140){
    res.status(400).json({ "error": 'Chirp is too long' });
  }
    res.send({"valid": true})
}
/* app.get("/api/validate_chirp", (req, res)=>{
  console.log(req.body)
  res.send("works")
}) */
app.post("/api/validate_chirp",handler)
app.get("/admin/metrics",metrics)
app.post("/admin/reset", reset)

app.listen(PORT
  //, () => {
  //console.log(`Server is running attheres http://localhost:${PORT}`);
  //}
);