import User from "../models/user";
import express, { NextFunction, Request, Response } from 'express';
import passport from "../../../config/passport";
import jwt from 'jsonwebtoken';
import config from 'config'

export async function login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
          return res.status(401).json({ 
            status: 'KO',
            error: 'Invalid email or password' 
          });
        }
    
        req.login(user, { session: false }, async (loginErr) => {
          if (loginErr) {
            return res.status(500).json({ 
              status: 'KO',
              error: 'Login failed' 
            });
          }
    
          const token = jwt.sign({ id: user.id }, config.get('host.auth_secret'));
          return res.json({ 
            status: 'OK',
            token: token 
          });
        });
      })(req, res, next);
}

export async function register(req: Request, res: Response) {
  console.log('BODY', req.body);
  
    const { email, password } = req.body;
    try {
      const user = new User({ email, password });
      await user.save();
      res.json({ 
        status: 'OK',
        message: 'User registered successfully' 
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'OK',
        error: 'An error occurred while registering the user' 
      });
    }
}

export async function resetPassword(req: Request, res: Response) {

}