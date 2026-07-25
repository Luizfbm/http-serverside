import {db} from "../index.js";
import {NewUser, users} from "../schema.js"
import {eq} from "drizzle-orm";

export async function createUser(user: NewUser){
    const [result] = await db
        .insert(users)
        .values(user)
        .onConflictDoNothing()
        .returning();
    return result
}
export async function getUserByEmail(email:string){
    const [result] = await db
        .select({
            id : users.id,
            email: users.email,
            password: users.password,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt
        })
        .from(users)
        .where(eq(users.email, email))
    return result
}
export async function getUserByPass(pass:string){
    const [result] = await db
        .select({
            password: users.password
        })
        .from(users)
        .where(eq(users.password, pass))
    return result
}