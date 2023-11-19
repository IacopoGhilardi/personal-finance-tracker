import request from 'supertest';
import {getServer} from "../../../config/server";
import User from "../models/user";
const app = getServer();

describe('Auth Controller', () => {
  var testUser;

  beforeAll(async () => {
    // Create a test user for login testing
    testUser = await User.create({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should login with valid credentials', async () => {
    const validUser = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app)
        .post('/login')
        .send(validUser)
        .expect('Content-Type', /json/)
        .expect(200);

    const { token } = response.body;
    expect(token).toBeDefined();
  });

  it('should register a new user', async () => {
    const newUser = {
      email: 'newuser@example.com',
      password: 'newpassword123',
    };

    const response = await request(app)
        .post('/register')
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response.body.status).toEqual('OK');
  });

  afterAll(async () => {
    if (testUser) {
      await User.findByIdAndDelete(testUser._id);
    }
  });
});