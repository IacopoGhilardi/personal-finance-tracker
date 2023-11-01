import { MongoClient } from "mongodb";
import config from 'config';
import mongoose from "mongoose";
import logger from "../utils/logger";
let client = null;
let retries  = 3;

export async function initConnection(retry) {
    try {
        logger.info("Connecting to db")
        client = await mongoose.connect(config.get("mongodb.uri"))
        logger.info("Connected to db")
        
    } catch (error) {
        if (retry < retries) {
            logger.info("Retry...", retry)
            initConnection(retry++);
        }
        logger.info("Error connecting to mongo", error);        
    }
}

export function getClient(): MongoClient {
    return client;
}