import { closeConneciton, initConnection } from "../../../config/database";
import * as server from "../../../config/server";
import { request } from 'supertest';
import User from "../models/user";


beforeAll(async () => {
  await initConnection(1);
  server.initServer();
});


describe("Test authentication routes", () => {

  //Register
  test("it should register new user", async () => {

    const newUser = new User({
      email: "test@test.com",
      password: "changeMe!"
    });

    const registerResponse = await request(server.getServer())
    .post('/api/v1/users/register')
    .send(newUser)
    .expect(200)

    expect(registerResponse.status).toBe("OK")

    //On the second should be already registered
    const secondRegisterResponse = await request(server.getServer())
    .post('/api/v1/users/register')
    .send(newUser)
    .expect(200)

    expect(secondRegisterResponse.status).toBe("KO")
  });


  //Login
  test("it should login the registered user", async () => {
    const userCredentials = {
      email: "test@test.com",
      password: "changeMe!"
    };

    const loginResponse = await request(server.getServer())
      .post('/api/v1/login')
      .send(userCredentials)
      .expect(200);

      expect(loginResponse.status).toBe("OK")
      expect(loginResponse.token).not.toBe(null)
  });

});


afterAll(() => {
  closeConneciton();
  server.closeServerConnection();
});