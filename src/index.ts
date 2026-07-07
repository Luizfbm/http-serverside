import express from "express";
import postgres from "postgres";
import {migrate } from "drizzle-orm/postgres-js/migrator";
import {drizzle} from "drizzle-orm/postgres-js"
import {config} from "./config.js"
import {apiRouter} from './routes/api.js'
import {adminRouter} from './routes/admin.js'
import {appRouter} from './routes/app.js'
import {errorHandler} from "./errors.js"
import {middlewareLogResponses} from "./middleware/logging.js"


const migrationClient = postgres(config.db.url,{max:1})
await migrate(drizzle(migrationClient), config.db.migrationConfig);
const app = express();
const PORT = 8080;

app.use(middlewareLogResponses)
app.use(express.json())


app.use("/api",apiRouter);

app.use("/app",appRouter);

app.use("/admin", adminRouter)


app.use(errorHandler)
app.listen(PORT
  , () => {
  console.log(`Server is running attheres http://localhost:${PORT}`);
  }
);