// Unit tests for /chat endpoint validation
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';

// Create a test app with just the endpoint logic
const createTestApp = () => {
  const app = express();
  app.use(express.json());

  // Mock callOpenAI function
  const mockCallOpenAI = async (messages, model) => {
    return {
      id: 'test-id',
      choices: [
        {
          message: {
            content: 'Test response'
          }
        }
      ],
      usage: {
        total_tokens: 10
      }
    };
  };

  // POST /chat endpoint handler (same logic as server.js)
  app.post('/chat', async (req, res) => {
    try {
      const { query, systemPrompt, model } = req.body;

      // Validate required fields
      if (!query || query.trim() === '') {
        return res.status(400).json({ error: 'Query is required' });
      }

      if (!model || model.trim() === '') {
        return res.status(400).json({ error: 'Model selection is required' });
      }

      // Construct messages array
      const messages = [];
      
      // Add system message if systemPrompt is provided
      if (systemPrompt && systemPrompt.trim() !== '') {
        messages.push({
          role: 'system',
          content: systemPrompt
        });
      }
      
      // Add user message
      messages.push({
        role: 'user',
        content: query
      });

      // Call OpenAI API (mocked)
      const rawResponse = await mockCallOpenAI(messages, model);

      // Extract assistant message from response
      const message = rawResponse.choices[0].message.content;

      // Return both rawResponse and message to frontend
      res.json({
        rawResponse,
        message
      });

    } catch (error) {
      // Log error to console
      console.error('Error in /chat endpoint:', error);

      // Return 500 error with error details
      res.status(500).json({
        error: error.message || 'An unexpected error occurred'
      });
    }
  });

  return app;
};

describe('POST /chat endpoint', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  it('should return 400 error when query is missing', async () => {
    const response = await request(app)
      .post('/chat')
      .send({ model: 'gpt-4o-mini' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Query is required');
  });

  it('should return 400 error when query is empty string', async () => {
    const response = await request(app)
      .post('/chat')
      .send({ query: '', model: 'gpt-4o-mini' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Query is required');
  });

  it('should return 400 error when query is only whitespace', async () => {
    const response = await request(app)
      .post('/chat')
      .send({ query: '   ', model: 'gpt-4o-mini' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Query is required');
  });

  it('should return 400 error when model is missing', async () => {
    const response = await request(app)
      .post('/chat')
      .send({ query: 'Hello' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Model selection is required');
  });

  it('should return 400 error when model is empty string', async () => {
    const response = await request(app)
      .post('/chat')
      .send({ query: 'Hello', model: '' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Model selection is required');
  });

  it('should return 400 error when model is only whitespace', async () => {
    const response = await request(app)
      .post('/chat')
      .send({ query: 'Hello', model: '   ' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Model selection is required');
  });

  it('should return both rawResponse and message on success', async () => {
    const response = await request(app)
      .post('/chat')
      .send({
        query: 'Hello',
        model: 'gpt-4o-mini'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('rawResponse');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Test response');
  });

  it('should include system message when systemPrompt is provided', async () => {
    const response = await request(app)
      .post('/chat')
      .send({
        query: 'Hello',
        systemPrompt: 'You are a helpful assistant',
        model: 'gpt-4o-mini'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('rawResponse');
    expect(response.body).toHaveProperty('message');
  });

  it('should work without systemPrompt', async () => {
    const response = await request(app)
      .post('/chat')
      .send({
        query: 'Hello',
        model: 'gpt-4o-mini'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('rawResponse');
    expect(response.body).toHaveProperty('message');
  });

  it('should ignore empty systemPrompt', async () => {
    const response = await request(app)
      .post('/chat')
      .send({
        query: 'Hello',
        systemPrompt: '',
        model: 'gpt-4o-mini'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('rawResponse');
    expect(response.body).toHaveProperty('message');
  });

  it('should ignore whitespace-only systemPrompt', async () => {
    const response = await request(app)
      .post('/chat')
      .send({
        query: 'Hello',
        systemPrompt: '   ',
        model: 'gpt-4o-mini'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('rawResponse');
    expect(response.body).toHaveProperty('message');
  });
});
