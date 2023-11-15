import {Response} from "express";


export function getTokenFromBearer(token) {
    let splittedToken = token.split(' ');

    return splittedToken[1];
}

export function makeSuccessResponse(res: Response, code: number, data: object | string): Response {
    return res.status(code).json({
        'status': 'OK',
        'data': data
    });
}

export function makeErrorResponse(res: Response, code: number, error: object | string): Response {
    return res.status(code).json({
        'status': 'KO',
        'error': error
    });
}