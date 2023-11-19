import User from "../models/user";
import { NextFunction, Request, Response } from 'express';
import passport from "../../../config/passport";
import jwt from 'jsonwebtoken';
import config from 'config'
import {makeErrorResponse, makeSuccessResponse} from "../../../utils/utility";
import {encryptResourceId} from "../../../utils/tokenUtils";
import logger from "../../../utils/logger";
import * as authService from "../services/authService";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    passport.authenticate('local', { session: false }, (err: any, user: any) => {
        if (err || !user) {
            return makeErrorResponse(res, 401, "Invalid email or password");
        }
    
        req.login(user, { session: false }, async (loginErr) => {
          if (loginErr) {
            return makeErrorResponse(res, 500, "Login failed");
          }

          const token: object = {
              uuid: encryptResourceId(user.id)
          }

          const jwtToken: string = jwt.sign(token, config.get('auth.secret'), { expiresIn: config.get('auth.expiration_time') });
          return makeSuccessResponse(res, 200, jwtToken);
        });
      })(req, res, next);
}

export async function register(req: Request, res: Response) {  
    const { email, password } = req.body;
    try {
        await authService.registerNewUser(email, password);
        return makeSuccessResponse(res, 200, 'User registered successfully');
    } catch (error) {
        logger.error("Error registering user", error);
        if (error === 'User already exists') {
            return makeErrorResponse(res, 400, 'User already registered' );
        }
            return makeErrorResponse(res, 500, 'Error registering user' );
    }
}

export async function resetPassword(req: Request, res: Response) {

}