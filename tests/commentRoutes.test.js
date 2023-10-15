const request = require('supertest');
const app = require('../server');
const { Comment } = require('../models');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv'); // Import dotenv

dotenv.config(); // Load environment variables from .env file

describe('commentRoutes', () => {
  let connection;

  beforeAll(async () => {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  });

  afterAll(async () => {
    await connection.end();
  });

  beforeEach(async () => {
    await connection.query('TRUNCATE TABLE comment');
  });

  describe('POST /api/comment', () => {
    it('should create a new comment', async () => {
      const agent = request.agent(app);
      await agent
        .post('/api/users/login')
        .send({ email: 'test@test.com', password: 'password' });
      const res = await agent.post('/api/comment').send({
        comment_text: 'This is a test comment',
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body.comment_text).toBe('This is a test comment');
    });

    it('should return a 400 error if the comment_text field is empty', async () => {
      const agent = request.agent(app);
      await agent
        .post('/api/users/login')
        .send({ email: 'test@test.com', password: 'password' });
      const res = await agent.post('/api/comment').send({
        comment_text: '',
      });
      expect(res.status).toBe(400);
    });

    it('should return a 401 error if the user is not logged in', async () => {
      const res = await request(app).post('/api/comment').send({
        comment_text: 'This is a test comment',
      });
      expect(res.status).toBe(401);
    });
  });

  describe('DELETE /api/comment/:id', () => {
    it('should delete a comment', async () => {
      const agent = request.agent(app);
      await agent
        .post('/api/users/login')
        .send({ email: 'test@test.com', password: 'password' });
      const [result] = await connection.query(
        'INSERT INTO comment (comment_text, user_id) VALUES (?, ?)',
        ['This is a test comment', 1]
      );
      const res = await agent.delete(`/api/comment/${result.insertId}`);
      expect(res.status).toBe(200);
      const [comment] = await connection.query('SELECT * FROM comment');
      expect(comment.length).toBe(0);
    });

    it('should return a 404 error if the comment is not found', async () => {
      const agent = request.agent(app);
      await agent
        .post('/api/users/login')
        .send({ email: 'test@test.com', password: 'password' });
      const res = await agent.delete('/api/comment/999');
      expect(res.status).toBe(404);
    });

    it('should return a 401 error if the user is not logged in', async () => {
      const [result] = await connection.query(
        'INSERT INTO comment (comment_text, user_id) VALUES (?, ?)',
        ['This is a test comment', 1]
      );
      const res = await request(app).delete(`/api/comment/${result.insertId}`);
      expect(res.status).toBe(401);
    });

    it('should return a 403 error if the user does not own the comment', async () => {
      const agent = request.agent(app);
      await agent
        .post('/api/users/login')
        .send({ email: 'test@test.com', password: 'password' });
      const [result] = await connection.query(
        'INSERT INTO comment (comment_text, user_id) VALUES (?, ?)',
        ['This is a test comment', 2]
      );
      const res = await agent.delete(`/api/comment/${result.insertId}`);
      expect(res.status).toBe(403);
    });
  });
});
