import { Request, Response } from "express";
import * as utility from '../../../utils/utility'
import * as nordigenServices from '../services/nordigenService';
import {getTokenFromBearer, makeErrorResponse, makeSuccessResponse} from "../../../utils/utility";
import {getUserFromToken} from "../services/userService";
import User from "../models/user";


export async function getUserToken(req: Request, res: Response) {
    let tokenResponse = await nordigenServices.getToken();

    if (tokenResponse.status == 200) {
        return makeSuccessResponse(res, 200, tokenResponse.data)
    }

    return makeErrorResponse(res, 400, tokenResponse.data.error)
}

export async function getInstitutions(req: Request, res: Response) {
    let access_token = utility.getTokenFromBearer(req.headers.authorization)
    let response = await nordigenServices.getInstitutions(access_token);      

    if (response.status == 200) {
        return makeSuccessResponse(res, 200, response.data);
    }

    return makeErrorResponse(res, 400, response.data.error)
}

export async function me(req: Request, res: Response) {
    const accessToken: string = getTokenFromBearer(req.headers.authorization);

    const user: User = await getUserFromToken(accessToken)

    if (user == null) {
        return makeErrorResponse(res, 404, "User not found");
    }
    return makeSuccessResponse(res, 200, user);
}