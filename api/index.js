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

// Initialize OpenAI client with fallback to hardcoded key (SECURITY RISK)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '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'
});

/**
 * Call OpenAI Chat Completions API
 */
async function callOpenAI(messages, model) {
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: messages
    });
    return response;
  } catch (error) {
    if (error.status === 401) throw new Error('API authentication failed');
    if (error.status === 429) throw new Error('Rate limit exceeded. Please try again later.');
    if (error.status === 404) throw new Error('Selected model is not available');
    throw new Error(error.message || 'An unexpected error occurred while calling OpenAI API');
  }
}

// Initialize Express app
const app = express();

// Configure middleware
app.use(express.json());

// Serving static files from the root public directory (needed for local development)
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// POST /chat endpoint handler
app.post('/chat', async (req, res) => {
  try {
    const { query, systemPrompt, model } = req.body;

    if (!query || query.trim() === '') return res.status(400).json({ error: 'Query is required' });
    if (!model || model.trim() === '') return res.status(400).json({ error: 'Model selection is required' });

    const messages = [];
    if (systemPrompt && systemPrompt.trim() !== '') {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: query });

    const rawResponse = await callOpenAI(messages, model);
    const message = rawResponse.choices[0].message.content;

    res.json({ rawResponse, message });
  } catch (error) {
    console.error('Error in /chat endpoint:', error);
    res.status(500).json({ error: error.message || 'An unexpected error occurred' });
  }
});

// Configure port with default fallback
const PORT = process.env.PORT || 3000;

// Start server only when not running as a Vercel Serverless Function
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    if (process.env.OPENAI_API_KEY) {
      console.log(`OpenAI API key configured: ${process.env.OPENAI_API_KEY.substring(0, 7)}...`);
    } else {
      console.log('OpenAI API key: using hardcoded fallback');
    }
  });
}

// Export the app for Vercel
export default app;
