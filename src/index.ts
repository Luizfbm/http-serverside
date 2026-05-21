import express from "express";
import {Request, Response} from "express"
const app = express();
const PORT = 8080;
function handlerReadiness(req : Request, res:Response){
    res.set({"Content-type": "text/plain"})
    res.send({"body": "OK"})
}
app.get("/healthz", handlerReadiness);
app.use("/app",express.static("./src/app"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  
});