# Requirements Document

## Introduction

This document specifies the requirements for a full-stack web application that provides a user interface for interacting with OpenAI's Chat Completions API. The application enables users to send queries to various GPT models with customizable system prompts and view both raw and formatted responses.

## Glossary

- **Frontend**: The client-side web interface built with HTML, CSS, and Vanilla JavaScript
- **Backend**: The server-side application built with Node.js and Express
- **Chat_API**: The OpenAI Chat Completions API endpoint
- **System_Prompt**: Instructions that define the AI assistant's behavior and personality
- **User_Query**: The question or message submitted by the user to the AI
- **Model_Selector**: A dropdown UI component allowing users to choose between different GPT models
- **Response_Display**: The output section showing both raw JSON and formatted assistant messages
- **API_Key**: The OpenAI authentication credential stored in environment variables

## Requirements

### Requirement 1: User Input Interface

**User Story:** As a user, I want to input my query and customize the AI's behavior, so that I can have tailored conversations with the chatbot.

#### Acceptance Criteria

1. THE Frontend SHALL provide a textarea input for User_Query with placeholder text "Ask anything..."
2. THE Frontend SHALL provide a textarea input for System_Prompt with placeholder text "Define behavior or rules for the AI (e.g., 'You are a strict teacher')"
3. THE Frontend SHALL provide a Model_Selector dropdown with options ["gpt-5", "gpt-5-mini", "gpt-5-nano", "gpt-4.1", "gpt-4o", "gpt-4o-mini"]
4. THE Frontend SHALL provide a submit button labeled "Send"
5. THE Frontend SHALL allow the Model_Selector to be extended with additional model options

### Requirement 2: Request Submission

**User Story:** As a user, I want to submit my query to the backend, so that I can receive AI-generated responses.

#### Acceptance Criteria

1. WHEN the user clicks the submit button, THE Frontend SHALL validate that User_Query is not empty
2. WHEN User_Query is empty, THE Frontend SHALL display an error message to the user
3. WHEN User_Query is valid, THE Frontend SHALL send a POST request to the "/chat" endpoint with JSON payload containing query, systemPrompt, and model fields
4. WHEN a request is submitted, THE Frontend SHALL display a loading indicator
5. WHILE a request is in progress, THE Frontend SHALL disable the submit button

### Requirement 3: Response Display

**User Story:** As a user, I want to see both the raw API response and formatted message, so that I can understand the complete response structure and read the assistant's answer clearly.

#### Acceptance Criteria

1. WHEN a response is received from the Backend, THE Response_Display SHALL show the complete raw JSON response
2. WHEN a response is received from the Backend, THE Response_Display SHALL show the extracted assistant message in formatted text
3. THE Response_Display SHALL be scrollable when content exceeds the visible area
4. WHEN a new request is submitted, THE Response_Display SHALL preserve the previous response until the new response arrives
5. WHEN an error occurs, THE Response_Display SHALL display an error message to the user

### Requirement 4: Backend API Endpoint

**User Story:** As a developer, I want a backend API endpoint that processes chat requests, so that the frontend can communicate with the OpenAI API securely.

#### Acceptance Criteria

1. THE Backend SHALL expose a POST endpoint at "/chat"
2. WHEN a POST request is received at "/chat", THE Backend SHALL accept a JSON body with query, systemPrompt, and model fields
3. WHEN the request body is missing required fields, THE Backend SHALL return an HTTP 400 error with a descriptive message
4. THE Backend SHALL construct a messages array with system role using systemPrompt and user role using query
5. THE Backend SHALL send the messages array and selected model to the Chat_API

### Requirement 5: OpenAI API Integration

**User Story:** As a developer, I want to integrate with OpenAI's Chat Completions API, so that the application can generate AI responses.

#### Acceptance Criteria

1. WHEN the Backend sends a request to Chat_API, THE Backend SHALL include the API_Key from environment variables
2. WHEN Chat_API returns a successful response, THE Backend SHALL return the complete raw API response to the Frontend
3. WHEN Chat_API returns a successful response, THE Backend SHALL extract and return the assistant message to the Frontend
4. WHEN Chat_API returns an error, THE Backend SHALL return an HTTP 500 error with the error details to the Frontend
5. THE Backend SHALL use the latest OpenAI API format for chat completions

### Requirement 6: Environment Configuration

**User Story:** As a developer, I want to configure the application using environment variables, so that sensitive credentials are not hardcoded.

#### Acceptance Criteria

1. THE Backend SHALL read the API_Key from a .env file using the key "OPENAI_API_KEY"
2. THE Backend SHALL read the server port from a .env file using the key "PORT" with a default value of 3000
3. WHEN the API_Key is not found in environment variables, THE Backend SHALL log an error and refuse to start
4. THE Backend SHALL serve static files from the "public" directory
5. THE .env file SHALL be excluded from version control

### Requirement 7: User Interface Design

**User Story:** As a user, I want a clean and modern interface, so that I can easily interact with the chatbot.

#### Acceptance Criteria

1. THE Frontend SHALL use a centered container layout with card-style design
2. THE Frontend SHALL use rounded corners for input elements
3. THE Frontend SHALL use a neutral color theme suitable for both dark and light preferences
4. THE Frontend SHALL be responsive and functional on mobile devices
5. THE Frontend SHALL maintain visual hierarchy with clear separation between input and output sections

### Requirement 8: Project Structure and Setup

**User Story:** As a developer, I want a well-organized project structure, so that I can easily maintain and extend the application.

#### Acceptance Criteria

1. THE project SHALL include a server.js file containing the Backend code
2. THE project SHALL include a package.json file with all required dependencies
3. THE project SHALL include a public directory containing index.html, style.css, and script.js files
4. THE project SHALL include a .env file template for configuration
5. THE project SHALL be runnable using "npm install" followed by "npm start" commands

### Requirement 9: Error Handling and Validation

**User Story:** As a user, I want clear error messages when something goes wrong, so that I can understand and resolve issues.

#### Acceptance Criteria

1. WHEN a network error occurs, THE Frontend SHALL display a user-friendly error message
2. WHEN the Backend receives an invalid request, THE Backend SHALL return a descriptive error message
3. WHEN Chat_API rate limits are exceeded, THE Backend SHALL return the rate limit error to the Frontend
4. THE Frontend SHALL handle all error responses gracefully without crashing
5. THE Backend SHALL log all errors to the console for debugging purposes

### Requirement 10: Dynamic Model Selection

**User Story:** As a user, I want to switch between different AI models, so that I can compare responses or use models suited for different tasks.

#### Acceptance Criteria

1. WHEN a user selects a model from Model_Selector, THE Frontend SHALL include the selected model in the API request
2. THE Backend SHALL pass the selected model name to Chat_API without modification
3. WHEN an invalid model name is provided, THE Chat_API SHALL return an error that is propagated to the user
4. THE Frontend SHALL remember the last selected model between requests
5. THE Model_Selector SHALL display the currently selected model clearly
