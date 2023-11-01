import request from 'supertest';
import express from 'express';
import User from '../models/user';
import app from '../routes';

describe('Authentication Routes', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const newUser = {
      name: 'John',
      surname: 'Doe',
      email: 'johndoe@example.com',
      password: 'securepassword',
    };

    const response = await request(app)
      .post('/register')
      .send(newUser)
      .expect(200); 

    expect(response.body.message).toBe('User registered successfully');
  });

  it('should login a registered user', async () => {
    const userToLogin = {
      email: 'johndoe@example.com',
      password: 'securepassword',
    };

    await User.create({
      name: 'John',
      surname: 'Doe',
      email: 'johndoe@example.com',
      password: 'hashedpassword',
    });

    const response = await request(app)
      .post('/login')
      .send(userToLogin)
      .expect(200);

    
    expect(response.body.token).toBeDefined();
  });
});
