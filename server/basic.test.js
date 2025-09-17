import request from 'supertest';
import { app } from '../server/socket/socket.js'; // adjust path if needed

describe('API basic tests', () => {
  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/unknown');
    expect(res.statusCode).toBe(404);
  });
});
