import express  from "express"
import {Request , Response, NextFunction } from "express"
import type {MigrationConfig} from "drizzle-orm/migrator"
import { Forbidden } from "./errors.js"


process.loadEnvFile()

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};

type DBConfig = {
    db: {
        url : string,
        migrationConfig : MigrationConfig,
        acess : string
    }
}

type APIConfig = {
    fileserverHits: number;
};

const envOrThrow = (key: string | undefined) => {
    if (typeof key !== 'string'){
        throw new Error 
    }
    return key
}
const forbiddenPlat = (key: string | undefined) => {
    if ( key !== 'dev'){
        throw new Forbidden("403 Forbidden") 
    }
    return key
}
const dbValidate = envOrThrow(process.env.DB_URL)
const acessValidate = forbiddenPlat(process.env.PLATAFORM)

export const config : DBConfig & APIConfig = {
    db: {
        url : dbValidate,
        migrationConfig : migrationConfig,
        acess : acessValidate
    },
    fileserverHits: 0,
}



