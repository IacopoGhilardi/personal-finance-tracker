import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false })(req, res, next);
}