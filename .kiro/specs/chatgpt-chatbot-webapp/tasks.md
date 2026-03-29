# Implementation Plan: ChatGPT Chatbot Web Application

## Overview

This implementation plan breaks down the chatgpt-chatbot-webapp into discrete coding tasks. The application is a full-stack web application with a Node.js/Express backend and vanilla JavaScript frontend that integrates with OpenAI's Chat Completions API.

Implementation follows an incremental approach: set up project structure, implement backend API with OpenAI integration, build frontend UI, add error handling, and finally implement comprehensive testing.

## Tasks

- [x] 1. Set up project structure and dependencies
  - Create project root directory structure
  - Initialize package.json with required dependencies (express, dotenv, openai)
  - Add dev dependencies (jest or vitest, supertest, fast-check)
  - Create public directory for frontend files
  - Create .env.example template file
  - Create .gitignore to exclude node_modules and .env
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 6.5_

- [x] 2. Implement backend server foundation
  - [x] 2.1 Create server.js with Express setup
    - Initialize Express app
    - Configure JSON body parsing middleware
    - Set up static file serving from public directory
    - Load environment variables with dotenv
    - Implement server startup with port configuration (default 3000)
    - Add API key validation on startup (exit if missing)
    - _Requirements: 4.1, 6.1, 6.2, 6.3, 6.4, 8.1_
  
  - [ ]* 2.2 Write unit tests for server configuration
    - Test server starts with valid configuration
    - Test server refuses to start without API key
    - Test port defaults to 3000 when not specified
    - Test static file serving from public directory
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 3. Implement OpenAI API integration module
  - [x] 3.1 Create OpenAI integration function
    - Implement callOpenAI(messages, model) function
    - Configure OpenAI client with API key from environment
    - Send chat completion request with messages and model
    - Return complete API response object
    - Throw descriptive errors on failure
    - _Requirements: 5.1, 5.2, 5.5_
  
  - [ ]* 3.2 Write property test for API key inclusion
    - **Property 10: API Key Inclusion**
    - **Validates: Requirements 5.1**
    - Verify API key is included in all OpenAI requests
    - _Requirements: 5.1_
  
  - [ ]* 3.3 Write unit tests for OpenAI integration
    - Test successful API call with mocked OpenAI response
    - Test error handling for various OpenAI error types
    - Test authentication error handling
    - _Requirements: 5.1, 5.2, 5.4_

- [x] 4. Implement /chat endpoint with validation
  - [x] 4.1 Create POST /chat endpoint handler
    - Accept JSON body with query, systemPrompt, and model fields
    - Validate required fields (query and model)
    - Return 400 error with descriptive message for missing fields
    - Construct messages array with system and user roles
    - Call OpenAI integration function
    - Extract assistant message from response
    - Return both rawResponse and message to frontend
    - Handle errors and return 500 with error details
    - Log all errors to console
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.2, 5.3, 5.4, 9.2, 9.5_
  
  - [ ]* 4.2 Write property test for request validation
    - **Property 7: Backend Request Validation**
    - **Validates: Requirements 4.3**
    - Verify 400 error for requests missing required fields
    - _Requirements: 4.3, 9.2_
  
  - [ ]* 4.3 Write property test for messages array construction
    - **Property 8: Messages Array Construction**
    - **Validates: Requirements 4.4**
    - Verify messages array has system and user messages for all valid inputs
    - _Requirements: 4.4_
  
  - [ ]* 4.4 Write property test for model name passthrough
    - **Property 9: Model Name Passthrough**
    - **Validates: Requirements 4.5, 10.1, 10.2**
    - Verify model name is passed to OpenAI without modification
    - _Requirements: 4.5, 10.1, 10.2_
  
  - [ ]* 4.5 Write property test for response proxying
    - **Property 11: Response Proxying**
    - **Validates: Requirements 5.2, 5.3**
    - Verify backend returns both raw response and extracted message
    - _Requirements: 5.2, 5.3_
  
  - [ ]* 4.6 Write property test for error propagation
    - **Property 12: Error Propagation**
    - **Validates: Requirements 5.4, 9.5**
    - Verify OpenAI errors return 500 with details and are logged
    - _Requirements: 5.4, 9.5_
  
  - [ ]* 4.7 Write property test for invalid request error handling
    - **Property 13: Invalid Request Error Handling**
    - **Validates: Requirements 9.2**
    - Verify descriptive error messages for all invalid requests
    - _Requirements: 9.2_
  
  - [ ]* 4.8 Write unit tests for /chat endpoint
    - Test successful request/response cycle with mocked OpenAI
    - Test 400 error for missing query
    - Test 400 error for missing model
    - Test 500 error for OpenAI API failures
    - Test error logging to console
    - _Requirements: 4.1, 4.2, 4.3, 5.4, 9.2, 9.5_

- [x] 5. Checkpoint - Ensure backend tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement frontend HTML structure
  - [x] 6.1 Create index.html with UI elements
    - Create centered container with card-style layout
    - Add textarea for user query with placeholder "Ask anything..."
    - Add textarea for system prompt with placeholder "Define behavior or rules for the AI (e.g., 'You are a strict teacher')"
    - Add select dropdown for model selection with options: gpt-5, gpt-5-mini, gpt-5-nano, gpt-4.1, gpt-4o, gpt-4o-mini
    - Add submit button labeled "Send"
    - Add loading indicator element (hidden by default)
    - Add error message container (hidden by default)
    - Add response display section with areas for raw JSON and formatted message
    - Link style.css and script.js files
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 7.1, 7.5_
  
  - [ ]* 6.2 Write unit tests for HTML structure
    - Test all required UI elements exist
    - Test placeholder text matches requirements
    - Test model dropdown has all required options
    - Test submit button has correct label
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 7. Implement frontend CSS styling
  - [x] 7.1 Create style.css with responsive design
    - Implement centered container layout with card design
    - Style input elements with rounded corners
    - Use neutral color theme suitable for dark and light modes
    - Add responsive styles for mobile devices
    - Style loading indicator
    - Style error message display (red text/border)
    - Style response display sections with scrollable areas
    - Maintain visual hierarchy between input and output sections
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 3.3_

- [x] 8. Implement frontend JavaScript functionality
  - [x] 8.1 Create script.js with input validation
    - Initialize UI state management
    - Implement form submission handler
    - Validate query is not empty or whitespace-only
    - Display error message for empty query
    - Prevent submission when query is invalid
    - _Requirements: 2.1, 2.2_
  
  - [ ]* 8.2 Write property test for empty query validation
    - **Property 1: Empty Query Validation**
    - **Validates: Requirements 2.1, 2.2**
    - Verify empty or whitespace queries are rejected without backend request
    - _Requirements: 2.1, 2.2_
  
  - [x] 8.3 Implement request submission logic
    - Construct JSON payload with query, systemPrompt, and model
    - Send POST request to /chat endpoint
    - Set loading state to true and disable submit button
    - Preserve previous response until new response arrives
    - Handle successful responses
    - Handle error responses
    - Clear loading state and re-enable button after response
    - _Requirements: 2.3, 2.4, 2.5, 3.4_
  
  - [ ]* 8.4 Write property test for valid request payload structure
    - **Property 2: Valid Request Payload Structure**
    - **Validates: Requirements 2.3**
    - Verify POST request contains all three fields for all valid inputs
    - _Requirements: 2.3_
  
  - [ ]* 8.5 Write property test for loading state management
    - **Property 3: Loading State Management**
    - **Validates: Requirements 2.4, 2.5**
    - Verify loading state and button disabled during requests
    - _Requirements: 2.4, 2.5_
  
  - [ ]* 8.6 Write property test for response persistence
    - **Property 5: Response Persistence During Transition**
    - **Validates: Requirements 3.4**
    - Verify previous response remains visible until new response arrives
    - _Requirements: 3.4_
  
  - [x] 8.7 Implement response display logic
    - Display complete raw JSON response in formatted code block
    - Extract and display assistant message in formatted text
    - Ensure response display is scrollable
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [ ]* 8.8 Write property test for response display completeness
    - **Property 4: Response Display Completeness**
    - **Validates: Requirements 3.1, 3.2**
    - Verify both raw JSON and extracted message are displayed
    - _Requirements: 3.1, 3.2_
  
  - [x] 8.9 Implement error handling
    - Display user-friendly error messages for network errors
    - Display error messages from backend responses
    - Handle errors gracefully without crashing
    - Clear previous errors before new requests
    - Log errors to console for debugging
    - _Requirements: 3.5, 9.1, 9.4_
  
  - [ ]* 8.10 Write property test for error display
    - **Property 6: Error Display**
    - **Validates: Requirements 3.5, 9.1, 9.4**
    - Verify error messages are displayed for all error types without crashing
    - _Requirements: 3.5, 9.1, 9.4_
  
  - [x] 8.11 Implement model selection persistence
    - Remember last selected model between requests
    - Display currently selected model clearly
    - Include selected model in API requests
    - _Requirements: 10.1, 10.4, 10.5_
  
  - [ ]* 8.12 Write property test for model selection persistence
    - **Property 14: Model Selection Persistence**
    - **Validates: Requirements 10.4, 10.5**
    - Verify model selection is maintained across requests
    - _Requirements: 10.4, 10.5_
  
  - [ ]* 8.13 Write property test for invalid model error propagation
    - **Property 15: Invalid Model Error Propagation**
    - **Validates: Requirements 10.3**
    - Verify invalid model errors are propagated and displayed
    - _Requirements: 10.3_
  
  - [ ]* 8.14 Write unit tests for frontend functionality
    - Test form submission with valid inputs
    - Test error display for empty query
    - Test loading indicator visibility
    - Test button disabled state during loading
    - Test response display with mocked API response
    - Test error handling with mocked error responses
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 3.1, 3.2, 3.5, 9.1, 9.4_

- [x] 9. Checkpoint - Ensure frontend tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Create configuration and documentation files
  - [x] 10.1 Create .env.example file
    - Add OPENAI_API_KEY placeholder
    - Add PORT configuration with default value
    - Include setup instructions in comments
    - _Requirements: 6.1, 6.2, 8.4_
  
  - [x] 10.2 Update package.json with scripts
    - Add "start" script to run server
    - Add "test" script to run all tests
    - Add "test:unit" script for unit tests only
    - Add "test:property" script for property tests only
    - Verify all dependencies are listed
    - _Requirements: 8.2, 8.5_
  
  - [x] 10.3 Create README.md with setup instructions
    - Document installation steps (npm install)
    - Document configuration steps (.env setup)
    - Document running instructions (npm start)
    - Document testing instructions (npm test)
    - List available model options
    - _Requirements: 8.5_

- [x] 11. Integration testing and final validation
  - [ ]* 11.1 Write integration tests for complete flow
    - Test complete request/response cycle from frontend to backend
    - Test error propagation through all layers
    - Test rate limit error handling
    - _Requirements: 9.3_
  
  - [x] 11.2 Manual validation checklist
    - Verify application starts with npm install && npm start
    - Verify all UI elements render correctly
    - Verify successful chat interaction with OpenAI
    - Verify error handling for various error conditions
    - Verify responsive design on mobile viewport
    - _Requirements: 8.5, 7.4_

- [x] 12. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests use fast-check library with minimum 100 iterations
- All property tests must include comment tags referencing design document properties
- Backend and frontend can be developed in parallel after task 1 is complete
- Integration tests should be run after both backend and frontend are implemented
- The application requires a valid OpenAI API key to function
