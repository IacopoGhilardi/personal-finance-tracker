import * as crypto from "crypto";
import config from "config";
import {Cipher, Decipher} from "crypto";
import jwt from "jsonwebtoken";

const algorithm: string = 'aes-256-cbc';
const iv: Buffer = crypto.randomBytes(16);
const hashKey: string = config.get('auth.secret');

export function getDataFromToken(token: string) {
    try {
        return jwt.verify(token, config.get('auth.secret'));
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export function encryptResourceId(token: string): string {
    const cipher: Cipher = crypto.createCipheriv(algorithm, Buffer.from(hashKey), iv);
    let encrypted: Buffer = cipher.update(token);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decryptReversibleUuid(reversibleUuid: string): string {
    const parts = reversibleUuid.split(':');
    const iv: Buffer = Buffer.from(parts.shift(), 'hex');
    const encryptedText: Buffer = Buffer.from(parts.join(':'), 'hex');
    const decipher: Decipher = crypto.createDecipheriv(algorithm, Buffer.from(hashKey), iv);
    let decrypted: Buffer = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}