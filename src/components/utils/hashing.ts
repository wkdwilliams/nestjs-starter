import * as argon2 from 'argon2';
import {Md5} from 'ts-md5';

/**
 * Returns a hashed password
 * @param plainPassword 
 * @returns 
 */
export async function GetPasswordHash(plainPassword: string): Promise<string> {
    return await argon2.hash(plainPassword, {
        memoryCost: 2048,
        timeCost:   4,
    });
}

/**
 * Compares a password against a hash and
 * returns wether or not it's correct.
 * @param hash
 * @param plainPassword 
 * @returns 
 */
export async function VerifyPassword(hash: string, plainPassword: string): Promise<boolean> {
    return await argon2.verify(hash, plainPassword);
}

export function GetMD5Hash(string: string): string {
    return Md5.hashStr(string);
}