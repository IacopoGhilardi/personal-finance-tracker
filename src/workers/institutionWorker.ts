import config from 'config';
import { getClient } from '../config/database';
import * as nordigenService from '../api/v1/services/nordigenService'
const mongoClient = getClient();

export async function institutionsCron() {
    
}