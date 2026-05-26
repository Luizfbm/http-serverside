import express from "express";
import {Request, Response, NextFunction} from "express"
import {middlewareMetricsInc, reset,metrics } from "./config.js"
const app = express();
const PORT = 8080;
app.use(middlewareLogResponses)

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
  let body = ""
  req.on("data",(chunck)=>{
    body += chunck
  })
  req.on("end",()=>{
    try{
      const parseBody = JSON.parse(body)
      res.send
    }catch(error){
      res.status(400).send("invalid JSON")
    }
  })
}
app.post("/api/validate_chirp", handler)
app.get("/admin/metrics",metrics)
app.post("/admin/reset", reset)

app.listen(PORT
  //, () => {
  //console.log(`Server is running attheres http://localhost:${PORT}`);
  //}
);