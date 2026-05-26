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

/* async function handler(req: Request,res: Response, next: NextFunction){
  type reqBody = {
    body : string
  }
  let bodyS = ""
  req.on("data",(chunck)=>{
    bodyS += chunck
  })
  req.on("end",()=>{
    try{
      const parseBody  = JSON.parse(bodyS)
    }catch(error){
      res.status(400).send({"error": "Chirp is too long"})
    }
  })
} */
/* app.get("/api/validate_chirp", (req, res)=>{
  console.log(req.body)
  res.send("works")
}) */
app.post("/api/validate_chirp", (req, res)=>{
  console.log(req.body)
  res.send("works")
})
app.get("/admin/metrics",metrics)
app.post("/admin/reset", reset)

app.listen(PORT
  //, () => {
  //console.log(`Server is running attheres http://localhost:${PORT}`);
  //}
);