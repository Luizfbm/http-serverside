import * as argon2 from "argon2"

export async function hashPassword(password: string): Promise<string>{
    const hash = await argon2.hash(password)
    return hash
}
export async function checkPasswordHash(password: string, hash: string): Promise<boolean>{
    if (await argon2.verify(password, hash)){
        return true
    }else{
        throw new Error
    }
}