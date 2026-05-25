import express from "express";
import {Request, Response, NextFunction} from "express"
const app = express();
const PORT = 8080;
app.use(middlewareLogResponses)
function handlerReadiness(req : Request, res:Response, next : NextFunction){
    res.set({"Content-type": "text/plain"})
    res.send({"body": "OK"})
}
app.get("/healthz",handlerReadiness);
app.use("/app", express.static("./src/app"));

function middlewareLogResponses(req: Request,res: Response, next: NextFunction){
     res.on("finish", () => {
      console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`)
    })
    next()
  }

app.listen(PORT
  //, () => {
  //console.log(`Server is running attheres http://localhost:${PORT}`);
  //}
);