import User from "../models/user";
import express, { NextFunction, Request, Response } from 'express';
import passport from "passport";
import jwt from 'jsonwebtoken';

export async function login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
    
        req.login(user, { session: false }, async (loginErr) => {
          if (loginErr) {
            return res.status(500).json({ error: 'Login failed' });
          }
    
          const token = jwt.sign({ id: user.id }, 'your-secret-key'); // Replace with your secret key
          return res.json({ token });
        });
      })(req, res, next);
}

export async function register(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = new User({ email, password });
      await user.save();
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while registering the user' });
    }
}

export async function resetPassword(req: Request, res: Response) {

}