import {db} from "../index.js";
import {NewChirp, chirps} from "../schema.js"
import {eq} from "drizzle-orm";

export async function createChirp(chirp: NewChirp){
    const [result] = await db
        .insert(chirps)
        .values(chirp)
        .onConflictDoNothing()
        .returning();
    return result
}
export async function getAllChirps(){
    const result = await db
        .select()
        .from(chirps)
    return result
}
export async function getChirpById(idChirp:string){
    const [result] = await db
        .select({
            id : chirps.id,
            message : chirps.body
        })
        .from(chirps)
        .where(eq(chirps.id, idChirp))
    return result;
}

