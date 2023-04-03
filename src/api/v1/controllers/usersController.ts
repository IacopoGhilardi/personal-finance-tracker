import { Request, Response } from "express";
import logger from "../../../utils/logger";
import * as nordigenServices from '../services/nordigen';


export async function getUserToken(req: Request, res: Response) {
    let testResponse = await nordigenServices.getToken();

    res.send(testResponse);
}

export async function getInstitutions(req: Request, res: Response) {
    try {
        let response = await nordigenServices.getInstitutions();

        console.log('Altro response', response);
        

        return res.status(200).json({
            'data': response.data
        });

    } catch (error) {
        console.log('Error', error);
        
        return res.status(400).json({
            'error': error
        });
    }
}