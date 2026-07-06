import express  from "express"
import {Request , Response, NextFunction } from "express"
import type {MigrationConfig} from "drizzle-orm/migrator"


process.loadEnvFile()

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};

type DBConfig = {
    db: {
        url : string,
        migrationConfig : MigrationConfig
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
const dbValidate = envOrThrow(process.env.DB_URL)

export const config : DBConfig & APIConfig = {
    db: {
        url : dbValidate,
        migrationConfig : migrationConfig
    },
    fileserverHits: 0,
}



