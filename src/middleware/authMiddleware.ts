import { Request, Response, NextFunction } from 'express';
import passport from '../config/passport';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false })(req, res, next);
}