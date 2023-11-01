import { getToken } from "./nordigenService";

test('Get token', async () => {
    const tokenResponse = await getToken();    

    expect(tokenResponse.status).toBe(200);
    expect(tokenResponse.data).not.toBeNull();
  });
  