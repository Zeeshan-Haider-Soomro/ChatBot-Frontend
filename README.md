# 💬 GPT Jaisa Replica (React)

A simple GPT-like chat interface built with React and Vite, featuring typing animations and a clean UI.

## Features

- ✨ Modern chat UI with smooth animations
- ⚡ Fast development with Vite
- 🎭 Typing effect simulation
- 🤖 Client-side mock AI responses
- 📱 Responsive design

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Run Locally (Windows PowerShell)

```powershell
# Navigate to project directory
cd d:\streaming

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser and go to: **http://localhost:5173**

## Build for Production

```powershell
npm run build
npm run preview
```

## Project Structure

```
streaming/
├── src/
│   ├── components/
│   │   ├── ChatInput.jsx    # Input field component
│   │   └── Message.jsx       # Message bubble component
│   ├── App.jsx               # Main app with chat logic
│   ├── main.jsx              # React entry point
│   └── styles.css            # Global styles
├── index.html                # HTML entry
├── vite.config.js            # Vite configuration
└── package.json              # Dependencies
```

## How It Works

This is a **demo application** with a client-side mock AI that:
- Responds to keywords (greetings, jokes, calculations)
- Simulates typing with character-by-character streaming
- Provides fallback responses for unrecognized inputs

### To Integrate Real AI:

To connect to OpenAI, Gemini, or other LLM APIs:
1. Create a backend proxy (Express/Node.js recommended)
2. Store API keys securely on the server
3. Update the `mockGenerateResponse` function to call your backend
4. Handle streaming responses from the API

## Technologies

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **CSS3** - Styling with animations

## License

MIT

---

**Note:** This is a demonstration project. For production use with real AI, implement proper API security, rate limiting, and error handling.
