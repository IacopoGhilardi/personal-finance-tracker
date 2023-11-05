import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { Express } from 'express';
import { Response } from 'express-serve-static-core';
import app from '../routes'; // Your Express app
import { login, register } from '../controllers/authController'; // Import your controller functions
import User from '../models/user';

describe('Authentication Routes', () => {
  let testApp: Express;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testDB');
    testApp = express();
    testApp.use(express.json());
    testApp.use('/register', register);
    testApp.use('/login', login);
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const newUser = {
      email: 'johndoe@example.com',
      password: 'securepassword',
    };

    const response = await request(testApp)
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
      email: 'johndoe@example.com',
      password: 'hashedpassword',
    });

    const response = await request(testApp)
      .post('/login')
      .send(userToLogin)
      .expect(200);

    expect(response.body.token).toBeDefined();
  });
});
