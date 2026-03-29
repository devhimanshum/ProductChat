# ChatGPT Chatbot Web Application

A full-stack web application that provides an intuitive interface for interacting with OpenAI's Chat Completions API. Built with vanilla JavaScript, HTML, CSS, and Node.js/Express.

## Features

- Interactive chat interface with customizable system prompts
- Support for multiple GPT models (gpt-5, gpt-5-mini, gpt-5-nano, gpt-4.1, gpt-4o, gpt-4o-mini)
- Real-time response display with both raw JSON and formatted output
- Responsive design for desktop and mobile devices
- Secure API key management through backend proxying

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

## Configuration

1. Create a `.env` file by copying the example:
```bash
cp .env.example .env
```

2. Open the `.env` file and add your OpenAI API key:
```
OPENAI_API_KEY=your_actual_api_key_here
PORT=3000
```

**Important:** Replace `your_actual_api_key_here` with your actual OpenAI API key. The application will not start without a valid API key.

**Optional:** Change the `PORT` value if port 3000 is already in use on your system.

## Running the Application

Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000` (or your configured port).

You should see a message in the console:
```
Server running on port 3000
```

## Using the Application

1. Open your browser and navigate to `http://localhost:3000`
2. Enter your question or message in the "Ask anything..." textarea
3. (Optional) Customize the AI's behavior using the system prompt textarea
4. Select your preferred GPT model from the dropdown
5. Click "Send" to submit your request
6. View the response in both raw JSON format and formatted text

## Available Models

The application supports the following OpenAI models:

- **gpt-5** - Latest GPT-5 model
- **gpt-5-mini** - Smaller, faster GPT-5 variant
- **gpt-5-nano** - Most compact GPT-5 variant
- **gpt-4.1** - GPT-4.1 model
- **gpt-4o** - GPT-4 optimized model
- **gpt-4o-mini** - Smaller GPT-4 optimized variant

Select the model that best fits your needs from the dropdown menu. The application will remember your last selection.

## Testing

Run all tests:
```bash
npm test
```

Run only unit tests:
```bash
npm run test:unit
```

Run only property-based tests:
```bash
npm run test:property
```

Run tests in watch mode (for development):
```bash
npm run test:watch
```

## Project Structure

```
chatgpt-chatbot-webapp/
├── public/              # Frontend files
│   ├── index.html      # Main HTML structure
│   ├── style.css       # Styling and responsive design
│   └── script.js       # Client-side JavaScript
├── server.js           # Express backend server
├── package.json        # Project dependencies and scripts
├── .env.example        # Environment variable template
├── .env               # Your configuration (not in git)
└── README.md          # This file
```

## Troubleshooting

**Server won't start:**
- Ensure you have set `OPENAI_API_KEY` in your `.env` file
- Check that the port is not already in use
- Verify Node.js is installed: `node --version`

**API errors:**
- Verify your OpenAI API key is valid
- Check your OpenAI account has available credits
- Ensure you have internet connectivity

**Empty responses:**
- Check the browser console for error messages
- Verify the backend server is running
- Check that your query is not empty

## Security Notes

- Never commit your `.env` file to version control
- Keep your OpenAI API key confidential
- The `.gitignore` file is configured to exclude `.env` automatically

## License

ISC
