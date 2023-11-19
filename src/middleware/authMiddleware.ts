import { Request, Response, NextFunction } from 'express';
import passport from '../config/passport';
import {makeErrorResponse} from "../utils/utility";

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      if (info && info.statusCode && info.message) {
        return res.status(info.statusCode).json({ message: info.message });
      }
      return makeErrorResponse(res, 401, 'Unauthorized');
    }
    req.user = user; // Attach user to the request object if needed
    return next();
  })(req, res, next);
}