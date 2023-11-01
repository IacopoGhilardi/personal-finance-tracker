import { Request, Response } from "express";
import logger from "../../../utils/logger";
import * as utility from '../../../utils/utility'
import * as nordigenServices from '../services/nordigenService';


export async function getUserToken(req: Request, res: Response) {
    let tokenResponse = await nordigenServices.getToken();

    if (tokenResponse.status == 200) {
        return res.status(200).json({
            'status': "OK",
            'data': tokenResponse.data
        })
    }
    
    return res.status(400).json({
        'status': "KO",
        'data': tokenResponse.data.error
    })
}

export async function getInstitutions(req: Request, res: Response) {
    let access_token = utility.getTokenFromBearer(req.headers.authorization)
    let response = await nordigenServices.getInstitutions(access_token);      

    if (response.status == 200) {
        return res.status(200).json({
            'status': 'OK',
            'data': response.data
        });
    }

    return res.status(400).json({
        'status': 'KO',
        'error': response.data.error
    }); 
}