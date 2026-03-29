// Load environment variables first
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate API key on startup
if (!process.env.OPENAI_API_KEY) {
  console.warn('WARNING: OPENAI_API_KEY not found in environment variables');
  console.warn('API functionality will be disabled. Please set the OPENAI_API_KEY environment variable.');
}

// Initialize OpenAI client with fallback to hardcoded key (SECURITY RISK)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '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'
});

/**
 * Call OpenAI Chat Completions API
 * @param {Array} messages - Array of message objects with role and content
 * @param {string} model - The GPT model to use
 * @returns {Promise<Object>} Complete OpenAI API response object
 * @throws {Error} Descriptive error on failure
 */
async function callOpenAI(messages, model) {
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: messages
    });
    return response;
  } catch (error) {
    // Throw descriptive errors based on error type
    if (error.status === 401) {
      throw new Error('API authentication failed');
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else if (error.status === 404) {
      throw new Error('Selected model is not available');
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      throw new Error('Failed to connect to OpenAI API');
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred while calling OpenAI API');
    }
  }
}

// Initialize Express app
const app = express();

// Configure middleware
app.use(express.json()); // JSON body parsing middleware

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// POST /chat endpoint handler
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

    // Call OpenAI API
    const rawResponse = await callOpenAI(messages, model);

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

// Configure port with default fallback
const PORT = process.env.PORT || 3000;

// Start server
// Start server only when not running as a Vercel Serverless Function
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    if (process.env.OPENAI_API_KEY) {
      console.log(`OpenAI API key configured: ${process.env.OPENAI_API_KEY.substring(0, 7)}...`);
    }
  });
}

export { app, callOpenAI };
