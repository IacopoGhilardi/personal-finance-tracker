import { MongoClient } from "mongodb";
import config from 'config';
const client = new MongoClient(config.get("mongodb.uri"));

export async function initConnection() {

    try {
        await client.connect();
        console.log('Connected to db');
        
    } catch (error) {
        console.log("Error connecting to mongo", error);        
    }
}

export function getClient(): MongoClient {
    return client;
}