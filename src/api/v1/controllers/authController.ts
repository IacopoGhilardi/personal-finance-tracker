import User from "../models/user";
import { NextFunction, Request, Response } from 'express';
import passport from "../../../config/passport";
import jwt from 'jsonwebtoken';
import config from 'config'
import {makeErrorResponse} from "../../../utils/utility";
import {encryptResourceId} from "../../../utils/tokenUtils";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    passport.authenticate('local', { session: false }, (err: any, user: any) => {
        if (err || !user) {
          return res.status(401).json({
            status: 'KO',
            error: 'Invalid email or password' 
          });
        }
    
        req.login(user, { session: false }, async (loginErr) => {
          if (loginErr) {
            return makeErrorResponse(res, 500, "Login failed");
          }

          const token: object = {
              uuid: encryptResourceId(user.id)
          }

          const jwtToken: string = jwt.sign(token, config.get('auth.secret'), { expiresIn: config.get('auth.expiration_time') });
          return res.json({
            status: 'OK',
            token: jwtToken
          });
        });
      })(req, res, next);
}

export async function register(req: Request, res: Response) {  
    const { email, password } = req.body;
    try {
      const userAlreadyExist = await User.findOne({ email: email }).lean().exec();

      if (userAlreadyExist != null) {
          return res.json({
            status: 'KO',
            error: 'User already registered'
          });
      }      

      const user = new User({ email, password });
      await user.save();
      return res.json({
        status: 'OK',
        message: 'User registered successfully' 
      });
    } catch (error) {
      return res.status(500).json({
        status: 'KO',
        error: 'An error occurred while registering the user' 
      });
    }
}

export async function resetPassword(req: Request, res: Response) {

}