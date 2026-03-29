// ChatGPT Chatbot Frontend JavaScript
// Implements: Tasks 8.1, 8.3, 8.7, 8.9, 8.11

// DOM Elements
const queryInput = document.getElementById('query');
const systemPromptInput = document.getElementById('systemPrompt');
const modelSelect = document.getElementById('model');
const submitBtn = document.getElementById('submitBtn');
const loadingIndicator = document.getElementById('loading');
const errorContainer = document.getElementById('error');
const formattedMessageDiv = document.getElementById('formattedMessage');
const rawResponsePre = document.getElementById('rawResponse');

// Application State
let isLoading = false;
let previousResponse = null;

// Task 8.11: Model Selection Persistence
// Load saved model selection from localStorage on page load
const savedModel = localStorage.getItem('selectedModel');
if (savedModel) {
    modelSelect.value = savedModel;
}

// Save model selection whenever it changes
modelSelect.addEventListener('change', () => {
    localStorage.setItem('selectedModel', modelSelect.value);
});

// Task 8.1: Input Validation
function validateQuery(query) {
    // Check if query is empty or contains only whitespace
    if (!query || query.trim() === '') {
        return {
            valid: false,
            error: 'Please enter a query'
        };
    }
    return { valid: true };
}

// Task 8.9: Error Handling
function displayError(message) {
    errorContainer.textContent = message;
    errorContainer.classList.remove('hidden');
    console.error('Error:', message);
}

function clearError() {
    errorContainer.textContent = '';
    errorContainer.classList.add('hidden');
}

// Task 8.7: Response Display Logic
function displayResponse(response) {
    // Display formatted message
    if (response.message) {
        formattedMessageDiv.textContent = response.message;
    }
    
    // Display raw JSON response
    if (response.rawResponse) {
        rawResponsePre.textContent = JSON.stringify(response.rawResponse, null, 2);
    }
}

// Task 8.3: Request Submission Logic
async function sendChatRequest(query, systemPrompt, model) {
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                systemPrompt: systemPrompt,
                model: model
            })
        });

        const data = await response.json();

        if (!response.ok) {
            // Backend returned an error
            throw new Error(data.error || 'Request failed');
        }

        return { success: true, data };
    } catch (error) {
        // Network error or other failure
        if (error.message === 'Failed to fetch') {
            return {
                success: false,
                error: 'Unable to connect to server. Please try again.'
            };
        }
        return {
            success: false,
            error: error.message
        };
    }
}

// Task 8.3: Loading State Management
function setLoadingState(loading) {
    isLoading = loading;
    
    if (loading) {
        submitBtn.disabled = true;
        loadingIndicator.classList.remove('hidden');
    } else {
        submitBtn.disabled = false;
        loadingIndicator.classList.add('hidden');
    }
}

// Main Form Submission Handler
async function handleSubmit(event) {
    if (event) {
        event.preventDefault();
    }
    
    // Clear previous errors
    clearError();
    
    // Get input values
    const query = queryInput.value;
    const systemPrompt = systemPromptInput.value;
    const model = modelSelect.value;
    
    // Task 8.1: Validate query
    const validation = validateQuery(query);
    if (!validation.valid) {
        displayError(validation.error);
        return;
    }
    
    // Task 8.3: Set loading state and preserve previous response
    setLoadingState(true);
    // Previous response remains visible until new response arrives
    
    // Task 8.3: Send request
    const result = await sendChatRequest(query, systemPrompt, model);
    
    // Clear loading state
    setLoadingState(false);
    
    // Task 8.9: Handle response or error
    if (result.success) {
        // Task 8.7: Display response
        displayResponse(result.data);
        previousResponse = result.data;
    } else {
        // Task 8.9: Display error
        displayError(result.error);
    }
}

// Event Listeners
submitBtn.addEventListener('click', handleSubmit);

// Allow Enter key to submit (Shift+Enter for new line in textarea)
queryInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
    }
});

console.log('ChatGPT Chatbot loaded');
